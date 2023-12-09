<h1 align="center" id="title">FIMRO Survey Polling Website</h1>

<h2>🚀Write challenges faced for the backend Code  </h2>
Building the backend for a Survey Polling application using MongoDB, CORS, dotenv, and Express presented a set of challenges, each met with strategic solutions to ensure a robust and scalable system.

- **1.MongoDB Integration:**: Integrating MongoDB involved establishing a seamless connection, designing a schema to store survey data efficiently, and implementing CRUD operations.
  -Solution: Implemented the official MongoDB Node.js driver, created models for surveys, and utilized indexing for efficient querying. This ensured a reliable connection and optimized data retrieval.

- **2.CORS Configuration:**:Cross-Origin Resource Sharing (CORS) can be a challenge when the frontend and backend are on different domains, leading to security restrictions.
  -Solution: Integrated the CORS middleware in Express to define the allowed origins, headers, and methods. This ensured a secure and controlled environment for cross-origin requests.

- **3.dotenv for Environment Variables:**: Managing sensitive information, such as database credentials and API keys, securely without hardcoding them in the code.
  -Solution: Utilized the dotenv library to load environment variables from a .env file, ensuring secure storage of sensitive information and facilitating easy configuration changes.

- **4.Express Routing and Middleware:**: Designing clear and maintainable routes for survey-related operations, implementing middleware for authentication, and handling errors gracefully.

-Solution: Structured Express routes logically, used middleware for token-based authentication, and implemented error handling middleware. This promoted code modularity and improved overall maintainability.
