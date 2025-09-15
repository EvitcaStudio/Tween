/**
 * @file A small library to class up log messages.
 *
 * @author https://github.com/doubleactii
 * @license Logger does not have a license at this time. For licensing contact the author
 */
/**
 * The Logger class
 * A small library to class up log messages.
 * @example <caption>Example usage of this class</caption>
 * import { Logger } from './logger.min.js';
 *
 * const logger = new Logger();
 *
 * logger.registerType('EXAMPLE', logger.FG_BLUE);
 *
 * logger.prefix('EXAMPLE').log('Logger started');
 *
 * // Assert example
 * const a = 10, b = 5;
 *
 * logger.assert(a % b == 1, 'error at a%b==1');
 * logger.assert(a > b, 'error at a>b');
 * logger.assert(b > a, 'error at b>a');
 *
 * // Counter example
 * for (let i = 0; i < 4; i ++) {
 *   logger.count('Example Label');
 * }
 * logger.countReset('Example Label');
 * logger.count('Example Label');
 *
 * // Debug example
 * logger.debug('Debug example', 1, true, [1, 2], { foo: 1, bar: 2 });
 * logger.prefix('EXAMPLE').debug('Debug example', 1, true, [1, 2], { foo: 1, bar: 2 });
 *
 * // Error example
 * logger.error('Error example', 1, true, [1, 2], { foo: 1, bar: 2 });
 * logger.prefix('EXAMPLE').error('Error example', 1, true, [1, 2], { foo: 1, bar: 2 });
 *
 * // Warn example
 * logger.warn('Warn example', 1, true, [1, 2], { foo: 1, bar: 2 });
 * logger.prefix('EXAMPLE').warn('Warn example', 1, true, [1, 2], { foo: 1, bar: 2 });
 *
 * // Info example
 * logger.info('Info example', 1, true, [1, 2], { foo: 1, bar: 2 });
 * logger.prefix('EXAMPLE').info('Info example', 1, true, [1, 2], { foo: 1, bar: 2 });
 *
 * // Log example
 * logger.log('Log example', 1, true, [1, 2], { foo: 1, bar: 2 });
 * logger.prefix('EXAMPLE').log('Log example', 1, true, [1, 2], { foo: 1, bar: 2 });
 *
 * // Group example
 * // group and groupCollapsed are interchangeable
 * logger.prefix('EXAMPLE').log("This is the outer level");
 * logger.prefix('EXAMPLE').groupCollapsed('Example Label2');
 * logger.prefix('EXAMPLE').prefix('EXAMPLE').log("Level 2");
 * logger.prefix('EXAMPLE').groupCollapsed('Example Label3');
 * logger.prefix('EXAMPLE').log("Level 3");
 * logger.prefix('EXAMPLE').warn("More of level 3");
 * logger.groupEnd('Example Label3');
 * logger.prefix('EXAMPLE').log("Back to level 2");
 * logger.groupEnd('Example Label2');
 * logger.prefix('EXAMPLE').log("Back to the outer level");
 *
 * // Table example
 * logger.table(["apples", "oranges", "bananas"]);
 *
 * // Time example
 * logger.time("Time example");
 * // Time passes by
 * logger.timeLog("Time example");
 *
 * logger.prefix('EXAMPLE').time("Time example");
 * // Time passes by
 * logger.prefix('EXAMPLE').timeLog("Time example");
 *
 * // Trace example
 * function foo() {
 *   function bar() {
 *     logger.trace();
 *   }
 *   bar();
 * }
 *
 * foo();
 *
 * // Clear the console example
 * setTimeout(() => { logger.clear(); }, 5000);
 */
export interface LoggerType {
    type: string;
    ansi: string;
}
export declare class Logger {
    readonly RESET = "\u001B[0m";
    readonly BRIGHT = "\u001B[1m";
    readonly DIM = "\u001B[2m";
    readonly UNDERSCORE = "\u001B[4m";
    readonly BLINK = "\u001B[5m";
    readonly REVERSE = "\u001B[7m";
    readonly HIDDEN = "\u001B[8m";
    readonly FG_BLACK = "\u001B[30m";
    readonly FG_RED = "\u001B[31m";
    readonly FG_GREEN = "\u001B[32m";
    readonly FG_YELLOW = "\u001B[33m";
    readonly FG_BLUE = "\u001B[34m";
    readonly FG_MAGENTA = "\u001B[35m";
    readonly FG_CYAN = "\u001B[36m";
    readonly FG_WHITE = "\u001B[37m";
    readonly FG_GRAY = "\u001B[90m";
    readonly BG_BLACK = "\u001B[40m";
    readonly BG_RED = "\u001B[41m";
    readonly BG_GREEN = "\u001B[42m";
    readonly BG_YELLOW = "\u001B[43m";
    readonly BG_BLUE = "\u001B[44m";
    readonly BG_MAGENTA = "\u001B[45m";
    readonly BG_CYAN = "\u001B[46m";
    readonly BG_WHITE = "\u001B[47m";
    readonly BG_GRAY = "\u001B[100m";
    private readonly TYPE_SPACER_LENGTH;
    private types;
    private currentType;
    private readonly SPACE_CHAR;
    readonly FG_COLORS: Record<number, string>;
    readonly BG_COLORS: Record<number, string>;
    constructor(pTypes?: LoggerType[]);
    /**
     * Apply a prefix to the message
     * @param pType - The type of log message
     */
    prefix(pType: string): this;
    /**
     * Log the message via pMethod
     * @param pMethod - The console method to use
     * @param pMessage - string, or array of strings of messages
     */
    private message;
    /**
     * @param pMessage - The message to log
     */
    log(...pMessage: any[]): void;
    /**
     * @param pMessage - The message to log in info format
     */
    info(...pMessage: any[]): void;
    /**
     * @param pMessage - The message to log in error format
     */
    error(...pMessage: any[]): void;
    /**
     * @param pMessage - The message to log in warning format
     */
    warn(...pMessage: any[]): void;
    /**
     * The console.assert() method writes an error message to the console if the assertion is false. If the assertion is true, nothing happens.
     * @param pMessage
     */
    assert(...pMessage: any[]): void;
    /**
     * The console.debug() method outputs a message to the web console at the "debug" log level. The message is only displayed to the user if the console is configured to display debug output. In most cases, the log level is configured within the console UI. This log level might correspond to the Debug or Verbose log level.
     * @param pMessage
     */
    debug(...pMessage: any[]): void;
    /**
     * The console.count() method logs the number of times that this particular call to count() has been called.
     * @param pLabel - A string. If supplied, count() outputs the number of times it has been called with that label. If omitted, count() behaves as though it was called with the "default" label.
     */
    count(pLabel?: string): void;
    /**
     * The console.countReset() method resets counter used with console.count().
     * @param pLabel - A string. If supplied, countReset() resets the count for that label to 0. If omitted, countReset() resets the default counter to 0.
     */
    countReset(pLabel?: string): void;
    /**
     * The console.table() method displays tabular data as a table.
     * @param pData - The data to display. This must be either an array or an object.
     * @param pColumns - An array containing the names of columns to include in the output.
     */
    table(pData: any, pColumns?: string[]): void;
    /**
     * The console.time() method starts a timer you can use to track how long an operation takes. You give each timer a unique name, and may have up to 10,000 timers running on a given page. When you call console.timeEnd() with the same name, the browser will output the time, in milliseconds, that elapsed since the timer was started.
     * @param pLabel - A string representing the name to give the new timer. This will identify the timer; use the same name when calling console.timeEnd() to stop the timer and get the time output to the console.
     */
    time(pLabel: string): void;
    /**
     * The console.timeLog() method logs the current value of a timer that was previously started by calling console.time().
     * @param pLabel - The name of the timer to log to the console. If this is omitted the label "default" is used.
     */
    timeLog(pLabel?: string): void;
    /**
     * The console.timeEnd() stops a timer that was previously started by calling console.time().
     * @param pLabel - A string representing the name of the timer to stop. Once stopped, the elapsed time is automatically displayed in the Web console along with an indicator that the time has ended.
     */
    timeEnd(pLabel: string): void;
    /**
     * The console.trace() method outputs a stack trace to the Web console.
     * @param pMessage - Zero or more objects to be output to console along with the trace. These are assembled and formatted the same way they would be if passed to the console.log() method.
     */
    trace(...pMessage: any[]): void;
    /**
     * The console.group() method creates a new inline group in the Web console log, causing any subsequent console messages to be indented by an additional level, until console.groupEnd() is called.
     * @param pLabel - Label for the group.
     */
    group(pLabel?: string): void;
    /**
     * The console.groupCollapsed() method creates a new inline group in the Web Console. Unlike console.group(), however, the new group is created collapsed. The user will need to use the disclosure button next to it to expand it, revealing the entries created in the group.
     * @param pLabel - Label for the group. Optional.
     */
    groupCollapsed(pLabel?: string): void;
    /**
     * The console.groupEnd() method exits the current inline group in the Web console. See Using groups in the console in the console documentation for details and examples.
     */
    groupEnd(): void;
    /**
     * Clears the console
     */
    clear(): void;
    /**
     * Registers a type to this logger
     * @param pType - The type to register to this logger
     * @param pAnsiInfo - The color this type will be when logged
     */
    registerType(pType: string, pAnsiInfo: string): void;
    /**
     * Registers the types in the pTypes array.
     * @param pTypes - The type array that contains the types to register.
     */
    registerTypes(pTypes: LoggerType[]): void;
    /**
     * Unregisters a type from this logger
     * @param pType - The type to unregister from this logger
     */
    unregisterType(pType: string): void;
}
