export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
export const TEST = 'test';

export const DEFAULT_BANNER_PATH = `${process.env.INIT_CWD}/source/static/banner.txt`;

export const TRACE_INFO = 'INFO';
export const TRACE_ERROR = 'ERROR';
export const TRACE_WARN = 'WARN';
export const TRACE_DEBUG = 'DEBUG';
export const TRACE_LOG = 'TRACE_LOG';
export const DEFAULT_TRACE_LOG_FILE = `${process.env.PWD}/log/trace.log`;
export const DEFAULT_TRACE_LOG_TRACE_TYPES = [TRACE_INFO, TRACE_ERROR, TRACE_WARN, TRACE_DEBUG];
export const DEFAULT_TRACE_LOG_TRACE_INTERVAL = '1d';
export const DEFAULT_TRACE_LOG_TRACE_SIZE = '10M';

/** Argv names */
export const ARGV_NODE_ENV = 'NODE_ENV';
export const ARGV_ENV_FILE = 'ENV_FILE';
export const ARGV_DEBUG_MODE = '--debug';
export const ARGV_DISABLE_TRACE_LOG_FILE = '--disable-trace-log-file';
export const ARGV_TRACE_LOG_FILE = 'TRACE_LOG_FILE';

/** Environment keys */
export const ENV_NODE_ENV = 'APP.ENV';
export const ENV_NAME_APP = 'APP.NAME';
export const ENV_TRACE_LOG_TRACE_TYPES = 'APP.LOG.TRACE.TYPES';
export const ENV_TRACE_LOG_TRACE_INTERVAL = 'APP.LOG.TRACE.INTERVAL';
export const ENV_TRACE_LOG_TRACE_SIZE = 'APP.LOG.TRACE.SIZE';

/** Environment files names */
export const DEVELOPMENT_FILE = '.env.development';
export const PRODUCTION_FILE = '.env.production';
export const TEST_FILE = '.env.test';
