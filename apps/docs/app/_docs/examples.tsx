"use client";

import { useId, useState } from "react";
import * as UI from "@sunnie/ui";
import { Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis } from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, File01Icon, Search01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ComponentSlug } from "./catalog";

const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;
const row = "flex flex-wrap items-center justify-center gap-3";
const stack = "flex w-full max-w-xs flex-col gap-4";
const icon = <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />;
const date = new Date(2026, 8, 11);
const label = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function Example({
  slug,
  state,
  compact = false,
}: {
  slug: ComponentSlug;
  state: string;
  compact?: boolean;
}) {
  const id = useId();
  const disabled = state === "Disabled";
  const invalid = state === "Invalid";
  if (compact && slug === "attachment")
    return (
      <div className="flex flex-col gap-3">
        <AttachmentSample />
        <AttachmentSample status="uploading" />
      </div>
    );
  if (compact && slug === "bubble") return <Conversation state="Conversation" />;
  if (compact && slug === "item")
    return (
      <UI.Item variant="outline">
        <UI.ItemMedia variant="icon">
          <HugeiconsIcon icon={File01Icon} />
        </UI.ItemMedia>
        <UI.ItemContent>
          <UI.ItemTitle>Project brief</UI.ItemTitle>
          <UI.ItemDescription>Updated today</UI.ItemDescription>
        </UI.ItemContent>
      </UI.Item>
    );
  if (compact && slug === "questionnaire")
    return (
      <UI.Questionnaire className="max-w-xs">
        <UI.QuestionnaireItem name="tool">
          <UI.QuestionnaireTitle>Choose a tool</UI.QuestionnaireTitle>
          <UI.QuestionnaireChoices>
            <UI.QuestionnaireChoice value="figma" defaultChecked>
              Figma
            </UI.QuestionnaireChoice>
            <UI.QuestionnaireChoice value="code">Code editor</UI.QuestionnaireChoice>
          </UI.QuestionnaireChoices>
        </UI.QuestionnaireItem>
      </UI.Questionnaire>
    );
  switch (slug) {
    case "button":
      if (state === "Sizes")
        return (
          <div className={row}>
            {(["xs", "sm", "default", "lg"] as const).map((size) => (
              <UI.Button key={size} size={size}>
                {label(size)}
              </UI.Button>
            ))}
          </div>
        );
      if (state === "Icon")
        return (
          <div className={row}>
            {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
              <UI.Button key={size} size={size} aria-label={`Add (${size})`}>
                {icon}
              </UI.Button>
            ))}
          </div>
        );
      if (state === "Loading")
        return (
          <UI.Button disabled>
            <UI.Spinner />
            Saving
          </UI.Button>
        );
      return (
        <div className={row}>
          {variants.map((variant) => (
            <UI.Button key={variant} variant={variant} disabled={disabled}>
              {label(variant)}
            </UI.Button>
          ))}
        </div>
      );
    case "badge":
      return (
        <div className={row}>
          {variants.map((variant) => (
            <UI.Badge key={variant} variant={variant}>
              {label(variant)}
            </UI.Badge>
          ))}
        </div>
      );
    case "input":
      return (
        <div className={stack}>
          {state === "Types" ? (
            <>
              <UI.Input type="email" aria-label="Email" placeholder="name@example.com" />
              <UI.Input type="password" aria-label="Password" defaultValue="secret123" />
              <UI.Input type="number" aria-label="Quantity" defaultValue="3" />
            </>
          ) : (
            <UI.Input
              aria-label={`${state} input`}
              placeholder="Your name"
              defaultValue={state === "Filled" ? "Alex Morgan" : undefined}
              disabled={disabled}
              aria-invalid={invalid || undefined}
            />
          )}
        </div>
      );
    case "textarea":
      return (
        <UI.Textarea
          className="max-w-xs"
          aria-label={`${state} message`}
          placeholder="Write a message…"
          defaultValue={state === "Filled" ? "The new components are ready for review." : undefined}
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
      );
    case "checkbox":
      return (
        <div className={stack}>
          {[false, true].map((checked) => (
            <label key={String(checked)} className="flex items-center gap-3 text-sm">
              <UI.Checkbox
                defaultChecked={checked}
                disabled={disabled}
                aria-invalid={invalid || undefined}
              />
              {checked ? "Selected" : "Not selected"}
            </label>
          ))}
          {state === "States" && (
            <label htmlFor={id} className="flex items-center gap-3 text-sm">
              <UI.Checkbox id={id} indeterminate />
              Indeterminate
            </label>
          )}
        </div>
      );
    case "switch":
      return (
        <div className={stack}>
          {[false, true].map((checked) => (
            <label key={String(checked)} className="flex items-center gap-3 text-sm">
              <UI.Switch
                defaultChecked={checked}
                size={state === "Small" ? "sm" : "default"}
                disabled={disabled}
              />
              {checked ? "On" : "Off"}
            </label>
          ))}
        </div>
      );
    case "radio-group":
      return (
        <UI.RadioGroup
          defaultValue="comfortable"
          disabled={disabled}
          aria-label="Density"
          className="max-w-xs"
        >
          {["Compact", "Comfortable", "Spacious"].map((name) => (
            <label key={name} htmlFor={`${id}-${name}`} className="flex items-center gap-3 text-sm">
              <UI.RadioGroupItem
                id={`${id}-${name}`}
                value={name.toLowerCase()}
                aria-invalid={invalid || undefined}
              />
              {name}
            </label>
          ))}
        </UI.RadioGroup>
      );
    case "slider":
      return (
        <div className={state === "Vertical" ? "h-40" : stack}>
          <UI.Slider
            aria-label="Volume"
            defaultValue={state === "Range" ? [25, 75] : [45]}
            disabled={disabled}
            orientation={state === "Vertical" ? "vertical" : "horizontal"}
          />
        </div>
      );
    case "progress":
      return (
        <div className={stack}>
          {state === "Values" ? (
            [0, 35, 70, 100].map((value) => (
              <UI.Progress key={value} value={value} aria-label={`${value} percent`} />
            ))
          ) : (
            <UI.Progress value={state === "Indeterminate" ? null : 65} aria-label="Upload">
              {state === "With label" && (
                <>
                  <UI.ProgressLabel>Uploading</UI.ProgressLabel>
                  <UI.ProgressValue />
                </>
              )}
            </UI.Progress>
          )}
        </div>
      );
    case "spinner":
      return (
        <div className={row}>
          {state === "Sizes" ? (
            ["size-3", "size-5", "size-8"].map((size) => <UI.Spinner key={size} className={size} />)
          ) : (
            <>
              <UI.Spinner />
              <span className="text-sm">Loading…</span>
            </>
          )}
        </div>
      );
    case "label":
      return (
        <div className={stack}>
          <UI.Label htmlFor={id}>Email address</UI.Label>
          <UI.Input id={id} placeholder="name@example.com" disabled={disabled} />
        </div>
      );
    case "field":
      return (
        <UI.Field
          className="max-w-xs"
          orientation={state === "Horizontal" ? "horizontal" : "vertical"}
          data-invalid={invalid || undefined}
          data-disabled={disabled || undefined}
        >
          {state === "Horizontal" ? (
            <>
              <UI.Switch id={id} />
              <UI.FieldLabel htmlFor={id}>Email notifications</UI.FieldLabel>
            </>
          ) : (
            <>
              <UI.FieldLabel htmlFor={id}>Email address</UI.FieldLabel>
              <UI.Input
                id={id}
                placeholder="name@example.com"
                disabled={disabled}
                aria-invalid={invalid || undefined}
                aria-describedby={`${id}-help`}
              />
              {invalid ? (
                <UI.FieldError id={`${id}-help`}>Enter a valid email address.</UI.FieldError>
              ) : (
                <UI.FieldDescription id={`${id}-help`}>
                  Use your work email address.
                </UI.FieldDescription>
              )}
            </>
          )}
        </UI.Field>
      );
    case "input-group":
      return (
        <UI.InputGroup className="max-w-xs">
          <UI.InputGroupInput aria-label="Search" placeholder="Search files…" />
          <UI.InputGroupAddon align={state === "Prefix" ? "inline-start" : "inline-end"}>
            {state === "Button" ? (
              <UI.InputGroupButton aria-label="Submit search">{icon}</UI.InputGroupButton>
            ) : state === "Prefix" ? (
              <HugeiconsIcon icon={Search01Icon} />
            ) : (
              <UI.InputGroupText>⌘ K</UI.InputGroupText>
            )}
          </UI.InputGroupAddon>
        </UI.InputGroup>
      );
    case "input-otp":
      return <OtpSample state={state} />;
    case "native-select":
      return (
        <UI.NativeSelect
          aria-label="Select a fruit"
          size={state === "Small" ? "sm" : "default"}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          defaultValue="apple"
        >
          <UI.NativeSelectOption value="apple">Apple</UI.NativeSelectOption>
          <UI.NativeSelectOption value="orange">Orange</UI.NativeSelectOption>
          <UI.NativeSelectOption value="grape">Grape</UI.NativeSelectOption>
        </UI.NativeSelect>
      );
    case "select":
      return (
        <UI.Select defaultValue={state === "Selected" ? "Apple" : null} disabled={disabled}>
          <UI.SelectTrigger
            className="w-48"
            size={state === "Small" ? "sm" : "default"}
            aria-label="Fruit"
            aria-invalid={invalid || undefined}
          >
            <UI.SelectValue placeholder="Select a fruit" />
          </UI.SelectTrigger>
          <UI.SelectContent>
            <UI.SelectGroup>
              {["Apple", "Orange", "Grape"].map((fruit) => (
                <UI.SelectItem key={fruit} value={fruit}>
                  {fruit}
                </UI.SelectItem>
              ))}
            </UI.SelectGroup>
          </UI.SelectContent>
        </UI.Select>
      );
    case "combobox":
      return (
        <UI.Combobox
          items={["Apple", "Orange", "Grape"]}
          defaultValue={state === "Selected" ? "Apple" : null}
          disabled={disabled}
        >
          <UI.ComboboxInput aria-label="Find a fruit" placeholder="Find a fruit…" showClear />
          <UI.ComboboxContent>
            <UI.ComboboxEmpty>No fruit found.</UI.ComboboxEmpty>
            <UI.ComboboxList>
              {(fruit: string) => (
                <UI.ComboboxItem key={fruit} value={fruit}>
                  {fruit}
                </UI.ComboboxItem>
              )}
            </UI.ComboboxList>
          </UI.ComboboxContent>
        </UI.Combobox>
      );
    case "accordion":
      return (
        <UI.Accordion
          className="max-w-sm"
          defaultValue={state === "Open" || state === "Multiple" ? ["one"] : []}
          multiple={state === "Multiple"}
          disabled={disabled}
        >
          {["one", "two"].map((value, index) => (
            <UI.AccordionItem key={value} value={value}>
              <UI.AccordionTrigger>
                {index === 0 ? "Can I use these components?" : "Can I change the styles?"}
              </UI.AccordionTrigger>
              <UI.AccordionContent>
                {index === 0
                  ? "Yes. Use them in your next project."
                  : "Yes. Each component uses the shared theme."}
              </UI.AccordionContent>
            </UI.AccordionItem>
          ))}
        </UI.Accordion>
      );
    case "collapsible":
      return (
        <UI.Collapsible className={stack} defaultOpen={state === "Open"} disabled={disabled}>
          <UI.CollapsibleTrigger render={<UI.Button variant="outline" />}>
            Project files
          </UI.CollapsibleTrigger>
          <UI.CollapsibleContent>
            <div className="rounded-xl border p-4 text-sm">
              app.tsx
              <br />
              styles.css
              <br />
              package.json
            </div>
          </UI.CollapsibleContent>
        </UI.Collapsible>
      );
    case "alert":
      return (
        <UI.Alert
          variant={state === "Destructive" ? "destructive" : "default"}
          className="max-w-sm"
        >
          <HugeiconsIcon icon={File01Icon} />
          <UI.AlertTitle>
            {state === "Destructive" ? "Upload failed" : "Changes saved"}
          </UI.AlertTitle>
          <UI.AlertDescription>
            {state === "Destructive"
              ? "Check your connection and try again."
              : "Your files are up to date."}
          </UI.AlertDescription>
        </UI.Alert>
      );
    case "avatar":
      return state === "Group" ? (
        <UI.AvatarGroup>
          {["AM", "JL", "SK"].map((name) => (
            <UI.Avatar key={name}>
              <UI.AvatarFallback>{name}</UI.AvatarFallback>
            </UI.Avatar>
          ))}
          <UI.AvatarGroupCount>+3</UI.AvatarGroupCount>
        </UI.AvatarGroup>
      ) : (
        <div className={row}>
          {(["sm", "default", "lg"] as const).map((size) => (
            <UI.Avatar key={size} size={size}>
              <UI.AvatarFallback>SK</UI.AvatarFallback>
              {state === "Badge" && <UI.AvatarBadge />}
            </UI.Avatar>
          ))}
        </div>
      );
    case "card":
      return (
        <UI.Card className="w-full max-w-xs" size={state === "Small" ? "sm" : "default"}>
          <UI.CardHeader>
            <UI.CardTitle>Design review</UI.CardTitle>
            <UI.CardDescription>Friday, 11 September</UI.CardDescription>
          </UI.CardHeader>
          <UI.CardContent>
            <div className="flex items-center gap-2">
              <UI.Avatar size="sm">
                <UI.AvatarFallback>SK</UI.AvatarFallback>
              </UI.Avatar>
              <span>3 people invited</span>
            </div>
          </UI.CardContent>
          <UI.CardFooter>
            <UI.Badge variant="secondary">Upcoming</UI.Badge>
          </UI.CardFooter>
        </UI.Card>
      );
    case "empty":
      return (
        <UI.Empty className="max-w-sm">
          <UI.EmptyHeader>
            <UI.EmptyMedia variant="icon">
              <HugeiconsIcon icon={File01Icon} />
            </UI.EmptyMedia>
            <UI.EmptyTitle>No files yet</UI.EmptyTitle>
            <UI.EmptyDescription>Your files will appear here.</UI.EmptyDescription>
          </UI.EmptyHeader>
          {state === "With action" && (
            <UI.EmptyContent>
              <FileAction />
            </UI.EmptyContent>
          )}
        </UI.Empty>
      );
    case "aspect-ratio":
      return (
        <div className="w-full max-w-xs">
          <UI.AspectRatio
            ratio={state === "Square" ? 1 : state === "4:3" ? 4 / 3 : 16 / 9}
            className="flex items-center justify-center rounded-xl bg-muted font-mono text-sm text-muted-foreground"
          >
            {state}
          </UI.AspectRatio>
        </div>
      );
    case "separator":
      return state === "Vertical" ? (
        <div className="flex h-6 items-center gap-4 text-sm">
          Overview
          <UI.Separator orientation="vertical" />
          Activity
          <UI.Separator orientation="vertical" />
          Settings
        </div>
      ) : (
        <div className={stack}>
          <span className="text-sm">Overview</span>
          <UI.Separator />
          <span className="text-sm text-muted-foreground">Activity</span>
        </div>
      );
    case "kbd":
      return state === "Single" ? (
        <div className={row}>
          <UI.Kbd>⌘</UI.Kbd>
          <UI.Kbd>Esc</UI.Kbd>
          <UI.Kbd>Enter</UI.Kbd>
        </div>
      ) : (
        <UI.KbdGroup>
          <UI.Kbd>⌘</UI.Kbd>
          <span>+</span>
          <UI.Kbd>K</UI.Kbd>
        </UI.KbdGroup>
      );
    case "skeleton":
      return (
        <div className={stack}>
          {state === "Card" && <UI.Skeleton className="h-24 w-full rounded-xl" />}
          <div className="flex gap-3">
            {state === "Avatar" && <UI.Skeleton className="size-10 shrink-0 rounded-full" />}
            <div className="flex flex-1 flex-col gap-3">
              <UI.Skeleton className="h-3 w-3/4" />
              <UI.Skeleton className="h-3 w-full" />
              <UI.Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      );
    case "toggle":
      return (
        <div className={row}>
          {state === "Sizes" ? (
            (["sm", "default", "lg"] as const).map((size) => (
              <UI.Toggle key={size} size={size} aria-label={`Bold (${size})`} className="font-bold">
                B
              </UI.Toggle>
            ))
          ) : (
            <>
              <UI.Toggle
                aria-label="Bold"
                variant={state === "Outline" ? "outline" : "default"}
                disabled={disabled}
                className="font-bold"
              >
                B
              </UI.Toggle>
              <UI.Toggle
                aria-label="Italic"
                variant={state === "Outline" ? "outline" : "default"}
                defaultPressed
                disabled={disabled}
                className="italic"
              >
                I
              </UI.Toggle>
              <UI.Toggle
                aria-label="Underline"
                variant={state === "Outline" ? "outline" : "default"}
                disabled={disabled}
                className="underline"
              >
                U
              </UI.Toggle>
            </>
          )}
        </div>
      );
    case "toggle-group":
      return (
        <UI.ToggleGroup
          multiple={state === "Multiple"}
          defaultValue={["bold"]}
          variant={state === "Outline" ? "outline" : "default"}
          disabled={disabled}
        >
          <UI.ToggleGroupItem value="bold" aria-label="Bold" className="font-bold">
            B
          </UI.ToggleGroupItem>
          <UI.ToggleGroupItem value="italic" aria-label="Italic" className="italic">
            I
          </UI.ToggleGroupItem>
          <UI.ToggleGroupItem value="underline" aria-label="Underline" className="underline">
            U
          </UI.ToggleGroupItem>
        </UI.ToggleGroup>
      );
    case "tabs":
      return (
        <UI.Tabs
          defaultValue="overview"
          orientation={state === "Vertical" ? "vertical" : "horizontal"}
          className="max-w-sm"
        >
          <UI.TabsList variant={state === "Line" ? "line" : "default"}>
            <UI.TabsTrigger value="overview">Overview</UI.TabsTrigger>
            <UI.TabsTrigger value="activity">Activity</UI.TabsTrigger>
            <UI.TabsTrigger value="settings" disabled={disabled}>
              Settings
            </UI.TabsTrigger>
          </UI.TabsList>
          {!compact && (
            <>
              <UI.TabsContent value="overview" className="p-4">
                Your project at a glance.
              </UI.TabsContent>
              <UI.TabsContent value="activity" className="p-4">
                All changes are saved.
              </UI.TabsContent>
              <UI.TabsContent value="settings" className="p-4">
                Your project settings.
              </UI.TabsContent>
            </>
          )}
        </UI.Tabs>
      );
    case "button-group":
      return (
        <UI.ButtonGroup orientation={state === "Vertical" ? "vertical" : "horizontal"}>
          <UI.Button variant="outline">Save</UI.Button>
          <UI.Button variant="outline">Preview</UI.Button>
          <UI.Button variant="outline" aria-label="Add">
            {icon}
          </UI.Button>
        </UI.ButtonGroup>
      );
    case "breadcrumb":
      return (
        <UI.Breadcrumb>
          <UI.BreadcrumbList>
            <UI.BreadcrumbItem>
              <UI.BreadcrumbLink href="/">Components</UI.BreadcrumbLink>
            </UI.BreadcrumbItem>
            <UI.BreadcrumbSeparator />
            {state === "Collapsed" && (
              <>
                <UI.BreadcrumbItem>
                  <UI.BreadcrumbEllipsis />
                </UI.BreadcrumbItem>
                <UI.BreadcrumbSeparator />
              </>
            )}
            <UI.BreadcrumbItem>
              <UI.BreadcrumbPage>Breadcrumb</UI.BreadcrumbPage>
            </UI.BreadcrumbItem>
          </UI.BreadcrumbList>
        </UI.Breadcrumb>
      );
    case "marker":
      return (
        <div className={stack}>
          {(["default", "separator", "border"] as const).map((variant) => (
            <UI.Marker key={variant} variant={variant}>
              <UI.MarkerContent>
                {variant === "default"
                  ? "Today"
                  : variant === "separator"
                    ? "New messages"
                    : "Yesterday"}
              </UI.MarkerContent>
            </UI.Marker>
          ))}
        </div>
      );
    case "bubble":
      return (
        <div className={stack}>
          {(state === "Variants"
            ? ([
                "default",
                "secondary",
                "muted",
                "tinted",
                "outline",
                "ghost",
                "destructive",
              ] as const)
            : (["secondary", "default"] as const)
          ).map((variant, index) => (
            <UI.Bubble
              key={variant}
              variant={variant}
              align={state === "Alignment" && index === 1 ? "end" : "start"}
            >
              <UI.BubbleContent>
                {state === "Variants"
                  ? label(variant)
                  : index === 0
                    ? "Ready for the review?"
                    : "Yes, let’s take a look."}
              </UI.BubbleContent>
              {state === "Reactions" && <UI.BubbleReactions>👍 2</UI.BubbleReactions>}
            </UI.Bubble>
          ))}
        </div>
      );
    case "attachment":
      return (
        <div className={row}>
          {state === "States"
            ? (["idle", "uploading", "processing", "error", "done"] as const).map((status) => (
                <AttachmentSample key={status} status={status} />
              ))
            : (["xs", "sm", "default"] as const).map((size) => (
                <AttachmentSample key={size} size={size} vertical={state === "Vertical"} />
              ))}
        </div>
      );
    case "item":
      return (
        <div className="flex w-full max-w-sm flex-col gap-3">
          {(state === "Variants"
            ? (["default", "outline", "muted"] as const)
            : (["outline"] as const)
          ).map((variant) => (
            <UI.Item key={variant} variant={variant} size={state === "Sizes" ? "sm" : "default"}>
              <UI.ItemMedia variant="icon">
                <HugeiconsIcon icon={File01Icon} />
              </UI.ItemMedia>
              <UI.ItemContent>
                <UI.ItemTitle>Project brief</UI.ItemTitle>
                <UI.ItemDescription>Updated today</UI.ItemDescription>
              </UI.ItemContent>
              <UI.ItemActions>
                <UI.Badge variant="secondary">PDF</UI.Badge>
              </UI.ItemActions>
            </UI.Item>
          ))}
          {state === "Sizes" && (
            <UI.Item variant="outline">
              <UI.ItemContent>
                <UI.ItemTitle>Default size</UI.ItemTitle>
                <UI.ItemDescription>Project files</UI.ItemDescription>
              </UI.ItemContent>
            </UI.Item>
          )}
        </div>
      );
    case "message":
      return <Conversation state={state} />;
    case "message-scroller":
      return (
        <UI.MessageScrollerProvider>
          <UI.MessageScroller className="h-64 max-w-sm rounded-xl border">
            <UI.MessageScrollerViewport>
              <UI.MessageScrollerContent className="gap-4 p-4">
                {Array.from({ length: state === "Long list" ? 20 : 6 }, (_, index) => (
                  <UI.MessageScrollerItem key={index}>
                    <Conversation state={index % 2 ? "Sent" : "Received"} />
                  </UI.MessageScrollerItem>
                ))}
              </UI.MessageScrollerContent>
            </UI.MessageScrollerViewport>
            <UI.MessageScrollerButton />
          </UI.MessageScroller>
        </UI.MessageScrollerProvider>
      );
    case "calendar":
      return <CalendarSample state={state} />;
    case "carousel":
      return (
        <UI.Carousel className="mx-10 w-full max-w-xs">
          <UI.CarouselContent>
            {[1, 2, 3, 4].map((number) => (
              <UI.CarouselItem
                key={number}
                className={state === "Multiple" ? "basis-1/2" : undefined}
              >
                <div className="flex h-32 items-center justify-center rounded-xl border bg-card text-3xl font-medium">
                  {number}
                </div>
              </UI.CarouselItem>
            ))}
          </UI.CarouselContent>
          <UI.CarouselPrevious />
          <UI.CarouselNext />
        </UI.Carousel>
      );
    case "chart":
      return <ChartSample state={state} />;
    case "command":
      return (
        <UI.Command className="max-w-sm border-border" shouldFilter={state !== "Empty"}>
          <UI.CommandInput placeholder="Search actions…" />
          <UI.CommandList>
            <UI.CommandEmpty>No results found.</UI.CommandEmpty>
            {state !== "Empty" && (
              <UI.CommandGroup heading="Actions">
                <UI.CommandItem>Calendar</UI.CommandItem>
                <UI.CommandItem>Search files</UI.CommandItem>
                <UI.CommandItem disabled>Settings</UI.CommandItem>
              </UI.CommandGroup>
            )}
          </UI.CommandList>
        </UI.Command>
      );
    case "pagination":
      return <PaginationSample ellipsis={state === "With ellipsis"} />;
    case "table":
      return (
        <UI.Table>
          <UI.TableHeader>
            <UI.TableRow>
              <UI.TableHead>File</UI.TableHead>
              <UI.TableHead>Status</UI.TableHead>
              <UI.TableHead className="text-right">Size</UI.TableHead>
            </UI.TableRow>
          </UI.TableHeader>
          <UI.TableBody>
            {state === "Empty" ? (
              <UI.TableRow>
                <UI.TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No files.
                </UI.TableCell>
              </UI.TableRow>
            ) : (
              ["Proposal.pdf", "Notes.md", "Cover.png"].map((name, index) => (
                <UI.TableRow
                  key={name}
                  data-state={state === "Selected" && index === 0 ? "selected" : undefined}
                >
                  <UI.TableCell className="font-medium">{name}</UI.TableCell>
                  <UI.TableCell>{index === 2 ? "Draft" : "Ready"}</UI.TableCell>
                  <UI.TableCell className="text-right">{index + 1}.2 MB</UI.TableCell>
                </UI.TableRow>
              ))
            )}
          </UI.TableBody>
        </UI.Table>
      );
    case "resizable":
      return (
        <UI.ResizablePanelGroup
          orientation={state === "Vertical" ? "vertical" : "horizontal"}
          className="h-48! max-w-sm rounded-xl border"
        >
          <UI.ResizablePanel defaultSize="35%" minSize="20%">
            <div className="flex h-full items-center justify-center p-6 text-sm">One</div>
          </UI.ResizablePanel>
          <UI.ResizableHandle withHandle />
          <UI.ResizablePanel defaultSize="65%" minSize="20%">
            <div className="flex h-full items-center justify-center p-6 text-sm">Two</div>
          </UI.ResizablePanel>
        </UI.ResizablePanelGroup>
      );
    case "scroll-area":
      return (
        <UI.ScrollArea className="h-48 w-full max-w-xs rounded-xl border">
          <div className={state === "Horizontal" ? "flex w-max gap-3 p-4" : "p-4"}>
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className={
                  state === "Horizontal"
                    ? "flex h-32 w-24 items-center justify-center rounded-lg bg-muted text-sm"
                    : "border-b py-3 text-sm"
                }
              >
                Item {index + 1}
              </div>
            ))}
          </div>
          {state === "Horizontal" && <UI.ScrollBar orientation="horizontal" />}
        </UI.ScrollArea>
      );
    case "direction":
      return (
        <UI.DirectionProvider direction={state === "Right to left" ? "rtl" : "ltr"}>
          <div dir={state === "Right to left" ? "rtl" : "ltr"} className="flex flex-col gap-4">
            <UI.Tabs defaultValue="one">
              <UI.TabsList>
                <UI.TabsTrigger value="one">First</UI.TabsTrigger>
                <UI.TabsTrigger value="two">Second</UI.TabsTrigger>
                <UI.TabsTrigger value="three">Third</UI.TabsTrigger>
              </UI.TabsList>
            </UI.Tabs>
            <span className="text-center text-xs text-muted-foreground">
              {state === "Right to left" ? "RTL" : "LTR"}
            </span>
          </div>
        </UI.DirectionProvider>
      );
    case "sidebar":
      return <SidebarSample active={state === "Active item"} />;
    case "questionnaire":
      return <QuestionnaireSample multiple={state === "Multiple choice"} />;
    case "dialog":
      return (
        <UI.Dialog>
          <UI.DialogTrigger render={<UI.Button variant="outline" />}>Open dialog</UI.DialogTrigger>
          <UI.DialogContent>
            <UI.DialogHeader>
              <UI.DialogTitle>
                {state === "Form" ? "Edit profile" : "Project details"}
              </UI.DialogTitle>
              <UI.DialogDescription>
                {state === "Form"
                  ? "Change your display name."
                  : "Everything is ready for your review."}
              </UI.DialogDescription>
            </UI.DialogHeader>
            {state === "Form" && (
              <UI.Field>
                <UI.FieldLabel htmlFor={id}>Name</UI.FieldLabel>
                <UI.Input id={id} defaultValue="Alex Morgan" />
              </UI.Field>
            )}
            <UI.DialogFooter>
              <UI.DialogClose render={<UI.Button />}>
                {state === "Form" ? "Save changes" : "Done"}
              </UI.DialogClose>
            </UI.DialogFooter>
          </UI.DialogContent>
        </UI.Dialog>
      );
    case "alert-dialog":
      return <AlertDialogSample small={state === "Small"} />;
    case "sheet":
      return (
        <UI.Sheet>
          <UI.SheetTrigger render={<UI.Button variant="outline" />}>
            Open {state.toLowerCase()} sheet
          </UI.SheetTrigger>
          <UI.SheetContent side={state.toLowerCase() as "right" | "left" | "top" | "bottom"}>
            <UI.SheetHeader>
              <UI.SheetTitle>Project details</UI.SheetTitle>
              <UI.SheetDescription>Review the latest changes.</UI.SheetDescription>
            </UI.SheetHeader>
            <div className="p-6">
              <UI.Badge variant="secondary">Ready for review</UI.Badge>
            </div>
            <UI.SheetFooter>
              <UI.SheetClose render={<UI.Button />}>Done</UI.SheetClose>
            </UI.SheetFooter>
          </UI.SheetContent>
        </UI.Sheet>
      );
    case "drawer":
      return (
        <UI.Drawer
          swipeDirection={state === "Right" ? "right" : "down"}
          showSwipeHandle
          snapPoints={state === "Snap points" ? [0.5, 1] : undefined}
        >
          <UI.DrawerTrigger render={<UI.Button variant="outline" />}>Open drawer</UI.DrawerTrigger>
          <UI.DrawerContent>
            <UI.DrawerHeader>
              <UI.DrawerTitle>Project details</UI.DrawerTitle>
              <UI.DrawerDescription>Swipe the handle to close.</UI.DrawerDescription>
            </UI.DrawerHeader>
            <div className="p-6 text-sm">All changes are saved.</div>
            <UI.DrawerFooter>
              <UI.DrawerClose render={<UI.Button />}>Done</UI.DrawerClose>
            </UI.DrawerFooter>
          </UI.DrawerContent>
        </UI.Drawer>
      );
    case "popover":
      return (
        <UI.Popover>
          <UI.PopoverTrigger render={<UI.Button variant="outline" />}>
            Open popover
          </UI.PopoverTrigger>
          <UI.PopoverContent side={state.toLowerCase() as "top" | "right" | "bottom" | "left"}>
            <UI.PopoverHeader>
              <UI.PopoverTitle>Notifications</UI.PopoverTitle>
              <UI.PopoverDescription>Choose what you receive.</UI.PopoverDescription>
            </UI.PopoverHeader>
            <label htmlFor={id} className="flex items-center gap-3 text-sm">
              <UI.Switch id={id} defaultChecked />
              Email updates
            </label>
          </UI.PopoverContent>
        </UI.Popover>
      );
    case "tooltip":
      return (
        <UI.TooltipProvider>
          <UI.Tooltip>
            <UI.TooltipTrigger render={<UI.Button variant="outline" />}>
              Hover or focus
            </UI.TooltipTrigger>
            <UI.TooltipContent side={state.toLowerCase() as "top" | "right" | "bottom" | "left"}>
              Add to your library
            </UI.TooltipContent>
          </UI.Tooltip>
        </UI.TooltipProvider>
      );
    case "hover-card":
      return (
        <UI.HoverCard>
          <UI.HoverCardTrigger
            href="/components/avatar"
            className="text-sm font-medium underline underline-offset-4"
          >
            @alex
          </UI.HoverCardTrigger>
          <UI.HoverCardContent side={state === "Top" ? "top" : "bottom"}>
            <div className="flex items-center gap-3">
              <UI.Avatar>
                <UI.AvatarFallback>AM</UI.AvatarFallback>
              </UI.Avatar>
              <div className="text-sm">
                <p className="font-medium">Alex Morgan</p>
                <p className="text-muted-foreground">Product designer</p>
              </div>
            </div>
          </UI.HoverCardContent>
        </UI.HoverCard>
      );
    case "dropdown-menu":
      return <MenuSample checkboxes={state === "Checkbox items"} />;
    case "context-menu":
      return <ContextMenuSample checkboxes={state === "Checkbox items"} />;
    case "menubar":
      return <MenubarSample checkboxes={state === "Checkbox items"} />;
    case "navigation-menu":
      return (
        <UI.NavigationMenu>
          <UI.NavigationMenuList>
            <UI.NavigationMenuItem>
              <UI.NavigationMenuTrigger>Getting started</UI.NavigationMenuTrigger>
              <UI.NavigationMenuContent>
                <div className="w-72">
                  <UI.NavigationMenuLink href="#introduction">
                    <div>
                      <div className="font-medium">Introduction</div>
                      <p className="text-muted-foreground">Learn how the system works.</p>
                    </div>
                  </UI.NavigationMenuLink>
                  <UI.NavigationMenuLink href="#installation">
                    <div>
                      <div className="font-medium">Installation</div>
                      <p className="text-muted-foreground">Add the package to your project.</p>
                    </div>
                  </UI.NavigationMenuLink>
                </div>
              </UI.NavigationMenuContent>
            </UI.NavigationMenuItem>
            <UI.NavigationMenuItem>
              <UI.NavigationMenuTrigger>Components</UI.NavigationMenuTrigger>
              <UI.NavigationMenuContent>
                <div className="grid w-96 grid-cols-2">
                  <UI.NavigationMenuLink href="#button">
                    <div>
                      <div className="font-medium">Button</div>
                      <p className="text-muted-foreground">Start an action or event.</p>
                    </div>
                  </UI.NavigationMenuLink>
                  <UI.NavigationMenuLink href="#dialog">
                    <div>
                      <div className="font-medium">Dialog</div>
                      <p className="text-muted-foreground">Show content above the page.</p>
                    </div>
                  </UI.NavigationMenuLink>
                  <UI.NavigationMenuLink href="#tabs">
                    <div>
                      <div className="font-medium">Tabs</div>
                      <p className="text-muted-foreground">Move between content sections.</p>
                    </div>
                  </UI.NavigationMenuLink>
                  <UI.NavigationMenuLink href="#tooltip">
                    <div>
                      <div className="font-medium">Tooltip</div>
                      <p className="text-muted-foreground">Give short supporting information.</p>
                    </div>
                  </UI.NavigationMenuLink>
                </div>
              </UI.NavigationMenuContent>
            </UI.NavigationMenuItem>
            <UI.NavigationMenuItem>
              <UI.NavigationMenuLink href="#docs" className={UI.navigationMenuTriggerStyle()}>
                Docs
              </UI.NavigationMenuLink>
            </UI.NavigationMenuItem>
          </UI.NavigationMenuList>
        </UI.NavigationMenu>
      );
    case "toast":
      return <ToastSample action={state === "With action"} />;
  }
  const missing: never = slug;
  throw new Error(`Missing example: ${missing}`);
}

function AttachmentSample({
  status = "done",
  size = "default",
  vertical = false,
}: {
  status?: "idle" | "uploading" | "processing" | "error" | "done";
  size?: "xs" | "sm" | "default";
  vertical?: boolean;
}) {
  return (
    <UI.Attachment state={status} size={size} orientation={vertical ? "vertical" : "horizontal"}>
      <UI.AttachmentMedia>
        {status === "uploading" || status === "processing" ? (
          <UI.Spinner />
        ) : (
          <HugeiconsIcon icon={File01Icon} />
        )}
      </UI.AttachmentMedia>
      <UI.AttachmentContent>
        <UI.AttachmentTitle>Notes.pdf</UI.AttachmentTitle>
        <UI.AttachmentDescription>
          {status === "done" ? "2.4 MB" : label(status)}
        </UI.AttachmentDescription>
      </UI.AttachmentContent>
    </UI.Attachment>
  );
}

function Conversation({ state }: { state: string }) {
  return (
    <UI.MessageGroup className="w-full max-w-sm">
      {(state === "Conversation" ? [false, true] : [state === "Sent"]).map((sent) => (
        <UI.Message key={String(sent)} align={sent ? "end" : "start"}>
          <UI.MessageAvatar>
            <UI.Avatar>
              <UI.AvatarFallback>{sent ? "SK" : "AM"}</UI.AvatarFallback>
            </UI.Avatar>
          </UI.MessageAvatar>
          <UI.MessageContent>
            <UI.MessageHeader>{sent ? "You" : "Alex"}</UI.MessageHeader>
            <UI.Bubble variant={sent ? "default" : "secondary"}>
              <UI.BubbleContent>
                {sent ? "Yes, let’s take a look." : "Ready for the review?"}
              </UI.BubbleContent>
            </UI.Bubble>
            <UI.MessageFooter>10:42</UI.MessageFooter>
          </UI.MessageContent>
        </UI.Message>
      ))}
    </UI.MessageGroup>
  );
}

function CalendarSample({ state }: { state: string }) {
  const [selected, setSelected] = useState<Date | undefined>(date);
  const [range, setRange] = useState<import("react-day-picker").DateRange | undefined>({
    from: date,
    to: new Date(2026, 8, 16),
  });
  return state === "Range" ? (
    <UI.Calendar
      mode="range"
      defaultMonth={date}
      selected={range}
      onSelect={setRange}
      className="rounded-xl border"
    />
  ) : (
    <UI.Calendar
      mode="single"
      defaultMonth={date}
      selected={selected}
      onSelect={setSelected}
      disabled={state === "Disabled dates" ? { dayOfWeek: [0, 6] } : undefined}
      className="rounded-xl border"
    />
  );
}

function ChartSample({ state }: { state: string }) {
  const data = [
    { day: "Mon", views: 32 },
    { day: "Tue", views: 58 },
    { day: "Wed", views: 46 },
    { day: "Thu", views: 72 },
    { day: "Fri", views: 61 },
  ];
  const axis = <XAxis dataKey="day" axisLine={false} tickLine={false} tickMargin={10} />;
  const tooltip = <UI.ChartTooltip content={<UI.ChartTooltipContent />} />;
  return (
    <UI.ChartContainer
      config={{ views: { label: "Views", color: "var(--primary)" } }}
      className="h-44 w-full max-w-sm"
    >
      {state === "Line" ? (
        <LineChart data={data}>
          {axis}
          {tooltip}
          <Line
            type="monotone"
            dataKey="views"
            stroke="var(--color-views)"
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      ) : state === "Area" ? (
        <AreaChart data={data}>
          {axis}
          {tooltip}
          <Area
            type="monotone"
            dataKey="views"
            stroke="var(--color-views)"
            fill="var(--color-views)"
            fillOpacity={0.15}
            isAnimationActive={false}
          />
        </AreaChart>
      ) : (
        <BarChart data={data}>
          {axis}
          {tooltip}
          <Bar dataKey="views" fill="var(--color-views)" radius={4} isAnimationActive={false} />
        </BarChart>
      )}
    </UI.ChartContainer>
  );
}

function PaginationSample({ ellipsis }: { ellipsis: boolean }) {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col gap-4">
      <UI.Pagination>
        <UI.PaginationContent>
          {[1, 2, 3].map((value) => (
            <UI.PaginationItem key={value}>
              <UI.PaginationLink
                href={`#page-${value}`}
                isActive={value === page}
                onClick={(event) => {
                  event.preventDefault();
                  setPage(value);
                }}
              >
                {value}
              </UI.PaginationLink>
            </UI.PaginationItem>
          ))}
          {ellipsis && (
            <>
              <UI.PaginationItem>
                <UI.PaginationEllipsis />
              </UI.PaginationItem>
              <UI.PaginationItem>
                <UI.PaginationLink
                  href="#page-10"
                  isActive={page === 10}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(10);
                  }}
                >
                  10
                </UI.PaginationLink>
              </UI.PaginationItem>
            </>
          )}
        </UI.PaginationContent>
      </UI.Pagination>
      <span className="text-center text-xs text-muted-foreground" aria-live="polite">
        Page {page}
      </span>
    </div>
  );
}

function FileAction() {
  const [added, setAdded] = useState(false);
  return (
    <UI.Button onClick={() => setAdded(true)} disabled={added}>
      {added ? "File added" : "Add a file"}
    </UI.Button>
  );
}

function SidebarSample({ active }: { active: boolean }) {
  const [selected, setSelected] = useState(active ? "Projects" : "");
  return (
    <UI.SidebarProvider className="min-h-0! max-w-sm overflow-hidden rounded-xl border">
      <UI.Sidebar collapsible="none" className="w-44! min-h-52">
        <UI.SidebarHeader className="p-4 text-sm font-medium">Workspace</UI.SidebarHeader>
        <UI.SidebarContent>
          <UI.SidebarGroup>
            <UI.SidebarMenu>
              {["Overview", "Projects", "Settings"].map((name) => (
                <UI.SidebarMenuItem key={name}>
                  <UI.SidebarMenuButton
                    isActive={selected === name}
                    onClick={() => setSelected(name)}
                  >
                    {icon}
                    <span>{name}</span>
                  </UI.SidebarMenuButton>
                </UI.SidebarMenuItem>
              ))}
            </UI.SidebarMenu>
          </UI.SidebarGroup>
        </UI.SidebarContent>
      </UI.Sidebar>
      <div className="flex flex-1 items-center justify-center p-4 text-xs text-muted-foreground">
        {selected || "Workspace"}
      </div>
    </UI.SidebarProvider>
  );
}

function QuestionnaireSample({ multiple }: { multiple: boolean }) {
  const [done, setDone] = useState(false);
  return done ? (
    <div className="flex flex-col items-center gap-4">
      <UI.Badge>Response saved</UI.Badge>
      <UI.Button variant="outline" onClick={() => setDone(false)}>
        Start again
      </UI.Button>
    </div>
  ) : (
    <UI.Questionnaire
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <UI.QuestionnaireItem name="tools" multiple={multiple} required>
        <UI.QuestionnaireTitle>
          {multiple ? "Which tools do you use?" : "Which tool do you use most?"}
        </UI.QuestionnaireTitle>
        <UI.QuestionnaireChoices>
          <UI.QuestionnaireChoice value="figma">Figma</UI.QuestionnaireChoice>
          <UI.QuestionnaireChoice value="code">Code editor</UI.QuestionnaireChoice>
          <UI.QuestionnaireChoice value="other" disabled>
            Other (unavailable)
          </UI.QuestionnaireChoice>
        </UI.QuestionnaireChoices>
        <UI.QuestionnaireError>Select an option.</UI.QuestionnaireError>
      </UI.QuestionnaireItem>
      <UI.QuestionnaireActions>
        <UI.QuestionnaireSubmit>Submit</UI.QuestionnaireSubmit>
      </UI.QuestionnaireActions>
    </UI.Questionnaire>
  );
}

function AlertDialogSample({ small }: { small: boolean }) {
  const [open, setOpen] = useState(false);
  const [removed, setRemoved] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3">
      <UI.AlertDialog open={open} onOpenChange={setOpen}>
        <UI.AlertDialogTrigger render={<UI.Button variant="outline" />}>
          Delete file
        </UI.AlertDialogTrigger>
        <UI.AlertDialogContent size={small ? "sm" : "default"}>
          <UI.AlertDialogHeader>
            <UI.AlertDialogTitle>Delete this file?</UI.AlertDialogTitle>
            <UI.AlertDialogDescription>
              This example changes local demo state only.
            </UI.AlertDialogDescription>
          </UI.AlertDialogHeader>
          <UI.AlertDialogFooter>
            <UI.AlertDialogCancel>Cancel</UI.AlertDialogCancel>
            <UI.AlertDialogAction
              variant="destructive"
              onClick={() => {
                setRemoved(true);
                setOpen(false);
              }}
            >
              Delete
            </UI.AlertDialogAction>
          </UI.AlertDialogFooter>
        </UI.AlertDialogContent>
      </UI.AlertDialog>
      <span className="text-xs text-muted-foreground" aria-live="polite">
        {removed ? "Example file deleted." : ""}
      </span>
    </div>
  );
}

function MenuSample({ checkboxes }: { checkboxes: boolean }) {
  const [checked, setChecked] = useState(true);
  const [action, setAction] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
      <UI.DropdownMenu>
        <UI.DropdownMenuTrigger render={<UI.Button variant="outline" />}>
          Open menu
        </UI.DropdownMenuTrigger>
        <UI.DropdownMenuContent>
          {checkboxes ? (
            <UI.DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
              Show sidebar
            </UI.DropdownMenuCheckboxItem>
          ) : (
            <>
              <UI.DropdownMenuItem onClick={() => setAction("Edit selected")}>
                Edit
              </UI.DropdownMenuItem>
              <UI.DropdownMenuItem disabled>Share</UI.DropdownMenuItem>
              <UI.DropdownMenuSeparator />
              <UI.DropdownMenuItem
                variant="destructive"
                onClick={() => setAction("Delete selected")}
              >
                Delete
              </UI.DropdownMenuItem>
            </>
          )}
        </UI.DropdownMenuContent>
      </UI.DropdownMenu>
      <span className="text-xs text-muted-foreground" aria-live="polite">
        {action}
      </span>
    </div>
  );
}

function ContextMenuSample({ checkboxes }: { checkboxes: boolean }) {
  const [checked, setChecked] = useState(true);
  const [action, setAction] = useState("");
  return (
    <UI.ContextMenu>
      <UI.ContextMenuTrigger
        className="flex h-28 w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground"
        tabIndex={0}
      >
        {action || "Right-click here"}
      </UI.ContextMenuTrigger>
      <UI.ContextMenuContent>
        {checkboxes ? (
          <UI.ContextMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
            Show details
          </UI.ContextMenuCheckboxItem>
        ) : (
          <>
            <UI.ContextMenuItem onClick={() => setAction("Open selected")}>Open</UI.ContextMenuItem>
            <UI.ContextMenuItem disabled>Share</UI.ContextMenuItem>
            <UI.ContextMenuSeparator />
            <UI.ContextMenuItem onClick={() => setAction("Copy selected")}>Copy</UI.ContextMenuItem>
          </>
        )}
      </UI.ContextMenuContent>
    </UI.ContextMenu>
  );
}

function MenubarSample({ checkboxes }: { checkboxes: boolean }) {
  const [checked, setChecked] = useState(true);
  const [action, setAction] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
      <UI.Menubar>
        {["File", "Edit", "View"].map((name) => (
          <UI.MenubarMenu key={name}>
            <UI.MenubarTrigger>{name}</UI.MenubarTrigger>
            <UI.MenubarContent>
              {checkboxes ? (
                <UI.MenubarCheckboxItem checked={checked} onCheckedChange={setChecked}>
                  Show toolbar
                </UI.MenubarCheckboxItem>
              ) : (
                <>
                  <UI.MenubarItem onClick={() => setAction(`${name}: first action`)}>
                    First action
                  </UI.MenubarItem>
                  <UI.MenubarItem onClick={() => setAction(`${name}: second action`)}>
                    Second action
                  </UI.MenubarItem>
                  <UI.MenubarItem disabled>Unavailable</UI.MenubarItem>
                </>
              )}
            </UI.MenubarContent>
          </UI.MenubarMenu>
        ))}
      </UI.Menubar>
      <span className="text-xs text-muted-foreground" aria-live="polite">
        {action}
      </span>
    </div>
  );
}

function ToastSample({ action }: { action: boolean }) {
  const [manager] = useState(() => UI.createToastManager());
  return (
    <UI.Toaster toastManager={manager}>
      <div className={row}>
        {(action ? ["info"] : ["success", "info", "warning", "error"]).map((type) => (
          <UI.Button
            key={type}
            variant="outline"
            onClick={() => {
              const toastId = manager.add({
                title: action
                  ? "File archived"
                  : `${type.charAt(0).toUpperCase()}${type.slice(1)} notification`,
                description: "This is an example notification.",
                type,
                ...(action
                  ? {
                      actionProps: {
                        children: "Undo",
                        onClick: () => {
                          manager.close(toastId);
                          manager.add({ title: "File restored", type: "success" });
                        },
                      },
                    }
                  : {}),
              });
            }}
          >
            {action ? "Show with action" : label(type)}
          </UI.Button>
        ))}
      </div>
    </UI.Toaster>
  );
}

export function GridArrow({ className }: { className?: string }) {
  return (
    <HugeiconsIcon icon={ArrowRight01Icon} className={className} size={16} strokeWidth={1.5} />
  );
}

function OtpSample({ state }: { state: string }) {
  const [value, setValue] = useState(state === "Filled" ? "123456" : "");
  return (
    <UI.InputOTP
      maxLength={6}
      aria-label="Verification code"
      disabled={state === "Disabled"}
      value={value}
      onChange={setValue}
    >
      <UI.InputOTPGroup>
        {[0, 1, 2].map((index) => (
          <UI.InputOTPSlot key={index} index={index} />
        ))}
      </UI.InputOTPGroup>
      <UI.InputOTPSeparator />
      <UI.InputOTPGroup>
        {[3, 4, 5].map((index) => (
          <UI.InputOTPSlot key={index} index={index} />
        ))}
      </UI.InputOTPGroup>
    </UI.InputOTP>
  );
}
