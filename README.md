# Frontend

## About

Finding suitable talent is challenging. It requires using various platforms with different queries, and these queries need to be optimized. This process takes experience and trial and error.

We use Claude API to transform natural language requirements into optimized search queries according to best practices, and show the data to the user. This makes it easier to find the talent users need.

## Table of Contents

- [Frontend](#frontend)
  - [About](#about)
  - [Table of Contents](#table-of-contents)
  - [File Structure](#file-structure)
  - [Getting Started](#getting-started)
    - [Features](#features)
    - [Pre-requisites](#pre-requisites)
    - [Run project](#run-project)
    - [Contributing](#contributing)
    - [License](#license)
    - [Acknowledgments](#acknowledgments)

## File Structure

check file structure

```bash
tree -I 'node_modules|public'
```

## Getting Started

### Features

- Transform natural language requirements into optimized search queries.
- Utilize Claude API for query optimization.
- Simplify the talent search process.

### Pre-requisites

1. [Node.js](https://nodejs.org/en/) or nvm installed.
2. `pnpm` installed.

### Run project

1. Clone the project

2. After cloning the project, run this command:  `pnpm install`

3. Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/lib/pages/index.tsx`. The page auto-updates as you edit the file.

### Contributing

We welcome contributions from the community. To contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes.
4. Commit your changes: `git add . && git commit -m "Add some feature"`.
5. Push to the branch: `git push origin feature-branch`.
6. Open a pull request.

Please read our [Contributing Guide](link-to-contributing-guide) for more details.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Thanks to the developers of the [Anthropic Claude API](https://www.anthropic.com/api) for their amazing work.
- Inspired by the best practices from [Better README](https://github.com/schultyy/better-readme) and [Readmine](https://github.com/mhucka/readmine).



