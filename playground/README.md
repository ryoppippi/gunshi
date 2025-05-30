# Gunshi Examples

This directory contains examples demonstrating the features of Gunshi, a modern JavaScript command-line library.
Each example is a standalone project with its own `package.json` file

## Examples

### 1. Simple API (`simple`)

Demonstrates how to use Gunshi with the Simple API.

```sh
cd simple
node index.js
```

### 2. Declarative Configuration (`declarative`)

Demonstrates how to configure commands declaratively.

```sh
cd declarative
node index.js --name World --greeting "Hey there" --times 3
```

### 3. Type-Safe Arguments (`type-safe`)

Demonstrates type-safe argument parsing with different option types using TypeScript.

```sh
cd type-safe
npx tsx index.ts --name John --age 30 --verbose
# or if you will use pnpm
# pnpx tsx index.ts --name John --age 30 --verbose
```

### 4. Composable Sub-commands (`composable`)

Demonstrates how to create a CLI with composable sub-commands.

```sh
cd composable
node index.js --help

# Create a resource
node index.js create --name my-resource --type special

# List resources
node index.js list --type special --limit 5

# Delete a resource
node index.js delete --name my-resource --force
```

### 5. Lazy & Async Command Loading (`lazy-async`)

Demonstrates lazy loading and asynchronous execution of commands.

```sh
cd lazy-async
node index.js --help
node index.js lazy --delay 2000
node index.js data --id 2
```

### 6. Type-Safe Lazy & Async Command Loading (`type-safe-lazy-async`)

Demonstrates type-safe lazy loading and asynchronous execution using TypeScript.

```sh
cd type-safe-lazy-async
pnpx tsx index.ts --help
pnpx tsx index.ts hello --name "Lazy TypeScript"
```

### 7. Modularization with Lazy Loading (`modularization-lazy-async`)

Demonstrates how to structure commands into separate modules and use lazy loading with `define` (from `gunshi/definition`) and `lazy`.

```sh
cd modularization-lazy-async
node index.js --help
node index.js foo --id 123
node index.js bar --msg "hello world"
```

### 8. Auto Usage Generation (`auto-usage`)

Demonstrates automatic usage message generation.

```sh
cd auto-usage
node index.js --help
node index.js --operation list --format json
```

### 9. Custom Usage Generation (`custom-usage`)

Demonstrates customizing the usage message generation.

```sh
cd custom-usage

node index.js --help
node index.js --add "Complete the project" --priority high --due 2023-12-31
```

### 10. Documentation Generation (`docs-gen`)

Documentation generation support

```sh
cd docs-gen
node index.js
```

### 11. Internationalization (`i18n`)

Demonstrates internationalization support.

```sh
cd i18n
node index.js --name John

# Japanese
MY_LOCALE=ja-JP node index.js --name 田中 --formal

# Help in English
node index.js --help

# Help in Japanese
MY_LOCALE=ja-JP node index.js --help
```

### 12. Custom Type Arguments (`custom-type`)

Demonstrates custom argument types with user-defined parsing logic.

```sh
cd custom-type
node index.js --help

# Parse comma-separated tags
node index.js --tags javascript,typescript,node.js

# Parse and validate JSON with Zod
node index.js --config '{"debug":true,"port":8080,"host":"0.0.0.0"}'

# Use both custom types with verbose output
node index.js --tags javascript,typescript,node.js --config '{"debug":true,"port":8080}'
```
