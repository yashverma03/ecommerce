import NodeCache from 'node-cache';

/**
 * Instance of NodeCache for caching data with a standard time-to-live (TTL) of 3600 seconds (1 hour).
 * @type {NodeCache}
 */
const cache = new NodeCache({ stdTTL: 3600 });

export default cache;
