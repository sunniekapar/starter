#!/usr/bin/env bash
set -euo pipefail

if (( $# > 1 )) || [[ ${1:-} != "" && ${1:-} != "--prepare-only" ]]; then
  echo "Usage: pnpm release [--prepare-only]" >&2
  exit 1
fi

prepare_only=false
[[ ${1:-} != "--prepare-only" ]] || prepare_only=true

version=$(pnpm pkg get version)
[[ $(pnpm pkg get private) == "true" ]] || {
  echo "Set private to true before creating a GitHub release." >&2
  exit 1
}

tag="v$version"
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

output=$(mktemp -d "${TMPDIR:-/tmp}/sunnie-ui-release.XXXXXX")
package_dir="$output/package"
archive="$output/sunnie-ui-$version.tgz"
mkdir -p "$package_dir"

node node_modules/typescript/bin/tsc -p tsconfig.build.json --outDir "$package_dir/dist"
cp styles.css package.json "$package_dir"
pnpm --dir "$package_dir" pkg delete scripts devDependencies packageManager
pnpm --dir "$package_dir" pack --out "$archive" >/dev/null
echo "Prepared $archive"

[[ $prepare_only == true ]] && exit 0

release_index="$output/git-index"
GIT_INDEX_FILE="$release_index" git read-tree --empty
GIT_INDEX_FILE="$release_index" git --work-tree="$package_dir" add --force -- \
  dist styles.css package.json
tree=$(GIT_INDEX_FILE="$release_index" git write-tree)
release_commit=$(git commit-tree "$tree" -p "$source_commit" -m "release: compiled UI $tag")

git tag -a "$tag" "$release_commit" -m "Compiled UI package from $source_commit"
git push origin "refs/tags/$tag"
gh release create "$tag" "$archive" \
  --verify-tag \
  --title "$tag" \
  --notes "Compiled UI package from source commit $source_commit. Install with pnpm from the $tag Git tag."
