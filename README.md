# veexecs
**AI-Driven Company Creation**

Veexecs is a platform that leverages the OpenAI API to simulate running a company with various AI agents handling different business functions. This repository contains both the backend (API) and frontend components necessary to deploy and use the application locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (preferably version 16.x or higher)
- npm (version 7.x or higher)

## Setup

### Cloning the Repository

Clone the repository to your local machine to get started:

```bash
git clone https://github.com/yourusername/veexecs.git
cd veexecs
```

### Environment Setup

To run this project, you will need to set up environment variables. Use the `.env.sample` file as a reference.

1. Copy the `.env.sample` file to `.env` in each project directory (`api` and `app`):

   For the API:
   ```sh
   cd api
   cp .env.sample .env
   ```
### Installing Dependencies

Navigate to both the api and app directories to install their respective dependencies:

```bash
    # Install dependencies for the backend
    cd api
    npm install

    # Install dependencies for the frontend
    cd ../app
    npm install
```