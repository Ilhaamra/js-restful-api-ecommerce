import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

const PORT = 9000;
web.listen(PORT, () => {
    logger.info(`Server run on port ${PORT}`);
});
