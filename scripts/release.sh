#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$root"

package=ui
if [[ ${1:-} == "ui" || ${1:-} == "config" ]]; then
  package=$1
  shift
fi
if (( $# > 1 )) || [[ ${1:-} != "" && ${1:-} != "--prepare-only" ]]; then
  echo "Usage: pnpm release [ui|config] [--prepare-only]" >&2
  exit 1
fi

prepare_only=false
[[ ${1:-} != "--prepare-only" ]] || prepare_only=true

manifest="$root/packages/$package/package.json"
version=$(node -p 'JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8")).version' "$manifest")
[[ $(node -p 'JSON.parse(require("node:fs").readFileSync(process.argv[1], "utf8")).private' "$manifest") == "true" ]] || {
  echo "Set private to true before creating a GitHub release." >&2
  exit 1
}

# Keep the existing UI tag format. Config has a separate version and tag prefix.
tag="v$version"
if [[ $package == config ]]; then
  tag="config/v$version"
else
  printf -v tag 'v%s.%02d' "${version%.*}" "${version##*.}"
fi
source_commit=$(git rev-parse HEAD)
git check-ref-format "refs/tags/$tag"

if [[ $prepare_only == false ]]; then
  [[ -z $(git status --porcelain) ]] || {
    echo "Commit the source changes before creating a release." >&2
    exit 1
  }
  ! git show-ref --verify --quiet "refs/tags/$tag" || {
    echo "$tag already exists locally." >&2
    exit 1
  }
  [[ -z $(git ls-remote --tags origin "refs/tags/$tag") ]] || {
    echo "$tag already exists on GitHub." >&2
    exit 1
  }
fi

output=$(mktemp -d "${TMPDIR:-/tmp}/sunnie-$package-release.XXXXXX")
package_dir="$output/package"
archive="$output/sunnie-$package-$version.tgz"

# Pack inside the workspace so pnpm resolves catalog and workspace versions.
pnpm --filter "@sunnie/$package" pack --out "$archive" >/dev/null
tar -xzf "$archive" -C "$output"
node --input-type=module - "$package_dir/package.json" <<'NODE'
import fs from "node:fs";
const file = process.argv[2];
const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
for (const key of ["scripts", "devDependencies", "packageManager"]) delete manifest[key];
fs.writeFileSync(file, JSON.stringify(manifest, null, 2) + "\n");
NODE
tar -czf "$archive" -C "$output" package
echo "Prepared $archive"

[[ $prepare_only == true ]] && exit 0

release_index="$output/git-index"
GIT_INDEX_FILE="$release_index" git read-tree --empty
GIT_INDEX_FILE="$release_index" git --work-tree="$package_dir" add --force -- .
tree=$(GIT_INDEX_FILE="$release_index" git write-tree)
release_commit=$(git commit-tree "$tree" -p "$source_commit" -m "release: compiled $package $tag")

git tag -a "$tag" "$release_commit" -m "Compiled $package package from $source_commit"
git push origin "refs/tags/$tag"
gh release create "$tag" "$archive" \
  --verify-tag \
  --title "$tag" \
  --notes "Compiled $package package from source commit $source_commit. Install with pnpm from the $tag Git tag."
