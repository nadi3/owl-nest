## Deployment

The Owl Nest frontend is designed to be containerized and served via Nginx. The repository includes a `dockerfile` and a `docker-compose.yml` configured for a professional production environment.

### Infrastructure Integration

By default, the deployment configuration is tailored for an automated infrastructure managed by **Traefik** as a reverse proxy.

-   **Network**: It expects an external Docker network named `web-proxy`.
-   **Labels**: Traefik labels are pre-configured to handle routing and TLS certificates.

For a complete overview of the infrastructure (including the Traefik setup and global orchestration), please refer to the [owl-infra](https://www.google.com/search?q=https://github.com/nadi3/owl-infra) repository.

### Standalone Docker Deployment
If you wish to run the container without a global reverse proxy or the `web-proxy` network, you must adapt the `docker-compose.yml`:
1.  **Remove the external network**: Change the `networks` section to use a local driver instead of `external: true`.
2.  **Expose ports**: Add a `ports` mapping to access Nginx directly (e.g., `- "8080:80"`).
3.  **Remove Traefik labels**: The labels are ignored if Traefik is not present, but can be cleaned up for clarity.

### Build Process
The `dockerfile` uses a multi-stage build:
1.  **Build Stage**: Uses Node 20 to compile the React application and generate the `dist/` folder.
2.  **Production Stage**: Uses a lightweight Nginx image to serve the static files using a custom `nginx.conf`.
