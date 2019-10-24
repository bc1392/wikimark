# WikiMark Specification

**Table of Contents**
- [Tag System](#tag-system)
- [Format Naming](#format-naming)
- [Available Tags](#available-tags)
- [Escaped Symbols](#escaped-symbols)
- [Inserting Code](#inserting-code)

---

### Tag System

Similar to HTML, Markdown, and other languages, **WikiMark uses tags** to insert characters, split up sections and paragraphs, and format text.

**Opening tags** are denoted by an opening square bracket, tag symbol, and an opening curly brace (example: `[!{`). **Closing tags** are denoted by a closing curly brace, tag symbol, and a closing square bracket (example: `}!]`). **Standalone tags** are tag symbols contained inside square brackets (example `[/]`).

---

### Format Naming

**WikiMark** files should be stored with the extension **`wmt`** which stands for WikiMark Text.

---

### Available Tags

With extremely simple, **symbol-based tags**, memorizing WikiMark tags is as easy as simply using them. As you use WikiMark you eventually learn and memorize the available tags.

- **`[={ }=]`** are comments, and are not shown to the reader, but are shown to those viewing a page's source.
- **`[>]`** inserts a tab (5 non-breaking spaces).
- **`[\]`** inserts a line break.
- **`[:{ }:]`** creates a paragraph block.
- **`[:v{ }:]`** creates a paragraph block with *no trailing whitespace*.
- **`[:^{ }:]`** creates a paragraph block with *no leading whitespace*.
- **`[:^v{ }:]`** creates a paragraph block with *no leading or trailing whitespace*.
- **`[#x{ }#x]`** are headings, where *x* is the size number (1-6, 6 being the smallest).
- **`[!{ }!]`** makes stronger (bold) text.
- **`[*{ }*]`** makes emphasizes (italic) text.
- **`[+{ }+]`** is used to note text that has been inserted.
- **`[-{ }-]`** is used to note text that has been removed.
- **`[;{ };]`** creates an inline code excerpt (these *can* be inserted inside paragraphs).
- **`[;;{ };;]`** creates a standalone block of code (these *cannot* be inserted inside paragraphs.).
- **`['{ }']`** creates a block quotation to reference from.
- **`[/"x"{ }/]`** links text to the url *x*.

---

### Escaped Symbols

Since all tags rely on symbols, **certain characters can be escaped** to allow for the use of them outside tag definitions and are escaped by inserting a `~` (tilda) before them. These characters *must be escaped* (including text inside code blocks) to prevent them from being interpreted as tags.

- **`~~`** - Tilda (~)
- **`~[`** - Opening square bracket.
- **`~]`** - Closing square bracket.
- **`~<`** - Less than / opening angle bracket.
- **`~>`** - More than / closing angle bracket.
- **`~{`** - Opening curly brace.
- **`~}`** - Closing curly brace.

---

### Inserting Code

With the current limitations of WikiMark, **inserted code must be escaped** and *newlines indicated with `[\]`*. Here's an example with original and fully escaped code:

```none
// Original Code
var message = "Hello, World!";

for (var i = 0; i < 10; i++) {
    console.log(i, message);
}
```

```none
// Fully Escaped Version
var message = "Hello, World!";[\]
[\]
for (var i = 0; i ~< 10; i++) ~{
    [>]console.log(i, message);[\]
~}
```