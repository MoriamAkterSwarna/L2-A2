import app from './app.js';
import config from './config/index.js';
import { initializeDatabase } from './db/index.js';
const startServer = async () => {
    try {
        await initializeDatabase();
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map