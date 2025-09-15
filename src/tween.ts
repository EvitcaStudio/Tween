// @ts-ignore
import { Logger } from './vendor/logger/logger';

/**
 * Easing function type definition
 */
type EasingFunction = (t: number, b: number, c: number, d: number) => number;

/**
 * Tween options interface
 */
interface TweenOptions {
    start?: Record<string, any>;
    end?: Record<string, any>;
    duration?: number;
    easing?: EasingFunction;
}

/**
 * Event callback type
 */
type EventCallback = () => void;

/**
 * Supported event types
 */
type EventType = 'start' | 'end' | 'pause' | 'resume';

/**
 * Class for creating a tweening animation
 * @class Tween  
 * @license Tween does not have a license at this time. For licensing contact the author
 * @author https://github.com/doubleactii
 */
class Tween {
    /**
     * @param options - The options for the tween animation
     * @param options.start - The starting properties of the animation
     * @param options.end - The end properties of the animation
     * @param options.duration - The duration of the animation in milliseconds
     * @param options.easing - The easing function to use for the animation
     */
    constructor({ start = {}, end = {}, duration = 1000, easing = Tween.linear }: TweenOptions = {}) {
        this._build(start, end, duration, easing);
    }

    /**
     * Linear easing function - constant speed
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static linear(t: number, b: number, c: number, d: number): number {
        return c * t / d + b;
    }
    
    /**
     * Quadratic ease-in function - slow start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInQuad(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t + b;
    }
    
    /**
     * Quadratic ease-out function - slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutQuad(t: number, b: number, c: number, d: number): number {
        return -c * (t /= d) * (t - 2) + b;
    }
    
    /**
     * Quadratic ease-in-out function - slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutQuad(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
    
    /**
     * Sine ease-in function - very slow start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInSine(t: number, b: number, c: number, d: number): number {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    
    /**
     * Sine ease-out function - very slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutSine(t: number, b: number, c: number, d: number): number {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    
    /**
     * Sine ease-in-out function - very slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutSine(t: number, b: number, c: number, d: number): number {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    
    /**
     * Exponential ease-in function - very slow start, fast end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInExpo(t: number, b: number, c: number, d: number): number {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    
    /**
     * Exponential ease-out function - fast start, very slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutExpo(t: number, b: number, c: number, d: number): number {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    
    /**
     * Exponential ease-in-out function - very slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutExpo(t: number, b: number, c: number, d: number): number {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    
    /**
     * Circular ease-in function - slow start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInCirc(t: number, b: number, c: number, d: number): number {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    
    /**
     * Circular ease-out function - slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutCirc(t: number, b: number, c: number, d: number): number {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    
    /**
     * Circular ease-in-out function - slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutCirc(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
    
    /**
     * Cubic ease-in function - slow start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInCubic(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t + b;
    }
    
    /**
     * Cubic ease-out function - slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutCubic(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    
    /**
     * Cubic ease-in-out function - slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutCubic(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
    
    /**
     * Quartic ease-in function - slow start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInQuart(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t * t + b;
    }
    
    /**
     * Quartic ease-out function - slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutQuart(t: number, b: number, c: number, d: number): number {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    
    /**
     * Quartic ease-in-out function - slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutQuart(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    
    /**
     * Quintic ease-in function - slow start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInQuint(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t * t * t + b;
    }
    
    /**
     * Quintic ease-out function - slow end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutQuint(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    
    /**
     * Quintic ease-in-out function - slow start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutQuint(t: number, b: number, c: number, d: number): number {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    
    /**
     * Elastic ease-in function - oscillating start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
			// Handle the Math.asin(0 / 0) case
			if (c === 0 && a === 0) {
				s = p / (2 * Math.PI) * Math.asin(1);
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
		}
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    
    /**
     * Elastic ease-out function - oscillating end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
			// Handle the Math.asin(0 / 0) case
			if (c === 0 && a === 0) {
				s = p / (2 * Math.PI) * Math.asin(1);
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
		}
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
    
    /**
     * Elastic ease-in-out function - oscillating start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutElastic(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        let p = 0;
        let a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
			// Handle the Math.asin(0 / 0) case
			if (c === 0 && a === 0) {
				s = p / (2 * Math.PI) * Math.asin(1);
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
		}
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }
    
    /**
     * Back ease-in function - overshoots at start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInBack(t: number, b: number, c: number, d: number): number {
        const s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    
    /**
     * Back ease-out function - overshoots at end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutBack(t: number, b: number, c: number, d: number): number {
        const s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    
    /**
     * Back ease-in-out function - overshoots at start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutBack(t: number, b: number, c: number, d: number): number {
        let s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }

    /**
     * Bounce ease-in function - bounces at start
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInBounce(t: number, b: number, c: number, d: number): number {
        return c - Tween.easeOutBounce(d - t, 0, c, d) + b;
    }

    /**
     * Bounce ease-out function - bounces at end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeOutBounce(t: number, b: number, c: number, d: number): number {
        t /= d;
        if (t < 1/2.75) {
            return c * 7.5625 * t * t + b;
        }
        
        if (t < 2/2.75) {
            t -= 1.5/2.75;
            return c * (7.5625 * t * t + 0.75) + b;
        }
        
        if (t < 2.5/2.75) {
            t -= 2.25/2.75;
            return c * (7.5625 * t * t + 0.9375) + b;
        } else {
            t -= 2.625/2.75;
            return c * (7.5625 * t * t + 0.984375) + b;
        }
    }

    /**
     * Bounce ease-in-out function - bounces at start and end
     * @param t - Current time
     * @param b - Starting value
     * @param c - Change in value
     * @param d - Duration
     * @returns The eased value
     */
    static easeInOutBounce(t: number, b: number, c: number, d: number): number {
        if (t < d*0.5) {
            return (Tween.easeInBounce(t*2, 0, c, d)*0.5 + b);
        }
        return (Tween.easeOutBounce(t*2 - d, 0, c, d)*0.5 + c*0.5 + b);
    }
	/**
	 * @param pNumber - The number to clamp
	 * @param pMin - The minimum number 
	 * @param pMax - The maximum number
	 * @returns The number clamped between the minimum and maximum values
	 */
	static _clamp(pNumber: number, pMin: number = 0, pMax: number = 1): number {
		return Math.max(pMin, Math.min(pNumber, pMax));
	}
	/**
	 * Converts an Hex color value to an array of [r, g, b].
	 *
	 * @param pHex - The Hex color in the form "#fff" or "#ffffff" or tagless.
	 * @return The array [r, g, b].
	 */
	static _hexToRgb(pHex: string): number[] {
		pHex = pHex.replace('#', '');
		if (pHex.length === 3) {
			pHex = pHex.replace(new RegExp('(.)', 'g'), '$1$1');
		}
		const hexArray = pHex.match(new RegExp('..', 'g'));
		if (!hexArray) return [0, 0, 0];
		const r = Tween._clamp(parseInt(hexArray[0], 16), 0, 255);
		const g = Tween._clamp(parseInt(hexArray[1], 16), 0, 255);
		const b = Tween._clamp(parseInt(hexArray[2], 16), 0, 255);
		return [r, g, b];
	}
	/**
	 * Converts an array of [r, g, b] to an Hex color code.
	 * 
	 * @param pColorArray - The rgb color array to convert into a hex
	 * @return The hex color
	 */
	static _rgbToHex(pColorArray: number[]): string {
		if (Array.isArray(pColorArray)) {
			return '#' + pColorArray.map((pColor) => Math.abs(Math.round(pColor)).toString(16).padStart(2, '0')).join('');
		}
		return '#000000';
	}
	/**
	 * The version of the module.
	 */
	version: string = "VERSION_REPLACE_ME";
    /**
     * Builds/Rebuilds the tween object with new info
     * @param pStart - The start object containing the start values
     * @param pEnd - The end object containing the end values
     * @param pDuration -  The duration of the effect
     * @param pEasing - The easing function to use
     */
    private _build(pStart: Record<string, any>, pEnd: Record<string, any>, pDuration: number, pEasing: EasingFunction): void {
        this.start = pStart;
        this.end = pEnd;
        this.duration = pDuration;
        this.easing = typeof(pEasing) === 'function' ? pEasing : Tween.linear;
        this.events = {};
        this.exportedValues = {};
        this.tweening = false;
        this.update = null;
        this.paused = false;
		this.lastTime = 0;
        this.elapsed = 0;
    }
    /**
     * @param options - The options for the tween animation
     * @param options.start - The starting properties of the animation
     * @param options.end - The end properties of the animation
     * @param options.duration - The duration of the animation in milliseconds
     * @param options.easing - The easing function to use for the animation
     */
    build({ start = {}, end = {}, duration = 1000, easing = Tween.linear }: TweenOptions = {}): this {
        this._build(start, end, duration, easing);
        return this;
    }
    /**
     * Attaches a callback to the specified event.
     * @param pEvent - The event to attach the callback to
     * @param pCallback - The function to be called when the event is triggered
     * @return The Tween instance
     */
    on(pEvent: EventType, pCallback: EventCallback): this {
        if (typeof(pCallback) === "function") {
            switch (pEvent) {
                case "start":
                case "end":
                case "pause":
                case "resume":
                    this.events[pEvent] = pCallback;
                    break;
                default:
                    logger.prefix('Tween-Module').error(`The event "${pEvent}" is not supported.`);
            }
        } else {
            logger.prefix('Tween-Module').error(`The callback for event "${pEvent}" is not a function.`);
        }
        return this;
    }
    /**
     * Update each frame.
     */
    animationFrame = (): void => {
        if (!this.tweening || this.paused) return;
		const now = Date.now();
		if (!this.lastTime) this.lastTime = now;
        this.elapsed += now - this.lastTime;
        let progress = this.elapsed / this.duration;
        
        if (this.oscillating) {
            progress = (1 - Math.cos(progress * Math.PI)) / 2;
        }
        
        if (progress > 1) {
            progress = 1;
        }

		for (let key in this.end) {
			let startValue = this.start[key];
			let endValue = this.end[key];
			if (typeof(startValue) === "string" && (startValue.length === 3 || startValue.length === 6) || startValue.length === 4 || startValue.length === 7) {
				startValue = Tween._hexToRgb(startValue);
				endValue = Tween._hexToRgb(endValue);
				const currentRGB = [
					this.easing(progress, startValue[0], endValue[0] - startValue[0], 1),
					this.easing(progress, startValue[1], endValue[1] - startValue[1], 1),
					this.easing(progress, startValue[2], endValue[2] - startValue[2], 1)
				];
				this.exportedValues[key] = Tween._rgbToHex(currentRGB);
			} else {
				this.exportedValues[key] = this.easing(progress, startValue, endValue - startValue, 1);
			}
		}

        if (this.update) {
            this.update(this.exportedValues);
        }

        if (progress === 1 && !this.oscillating) {
            this.stop();
            if (this.events.end) {
                this.events.end();
            }
        } else {
            requestAnimationFrame(this.animationFrame);
        }
		this.lastTime = now;
    }
    /**
     * Animates the tween by oscillating between the start and end properties.
     * @param pUpdate - A callback function to update the values during the oscillation.
     * @param pOscillate - A flag to indicate if the tween should oscillate.
     * @return Returns the Tween instance for method chaining.
     */
    animate(pUpdate: (values: Record<string, any>) => void, pOscillate: boolean = false): this {
        if (typeof(pUpdate) !== "function") {
            logger.prefix('Tween-Module').error("The pUpdate parameter passed to animate is not a function.");
            return this;
        }
        if (this.tweening) return this;
        let startProperties = Object.keys(this.start);
        let endProperties = Object.keys(this.end);

        if (!startProperties.length || !endProperties.length) {
            logger.prefix('Tween-Module').error("The start object or the end object has no properties.");
            return this;
        }

        if (!startProperties.every(prop => endProperties.includes(prop))) {
            logger.prefix('Tween-Module').error("The end object is missing properties that the start object has.");
            return this;
        }

        this.update = pUpdate;
        this.tweening = true;
		this.elapsed = 0;
        this.oscillating = pOscillate;

        if (this.events.start) {
            this.events.start();
        }
        requestAnimationFrame(this.animationFrame);
        return this;
    }
    /**
     * Resumes the tween animation
     * @returns The instance of the Tween object
     */
    resume(): this {
        if (this.paused) {
            this.lastTime = Date.now();
            this.paused = false;
            if (this.events.resume) {
                this.events.resume();
            }
            requestAnimationFrame(this.animationFrame);
        }
        return this;
    }
    /**
     * Pauses the tween animation
     * @returns The instance of the Tween object
     */
    pause(): this {
        if (!this.paused) {
            this.paused = true;
            if (this.events.pause) {
                this.events.pause();
            }
        }
        return this;
    }
    /**
     * Stops the tween and clears all data.
     */
    stop(): void {
        this.tweening = false;
        this.oscillating = false;
        this.update = null;
        this.elapsed = 0;
		this.lastTime = 0;
        this.paused = false;
        for (const prop in this.exportedValues) {
            if (this.exportedValues.hasOwnProperty(prop)) {
                delete this.exportedValues[prop];
            }
        }
    }

    // Instance properties
    start: Record<string, any> = {};
    end: Record<string, any> = {};
    duration: number = 1000;
    easing: EasingFunction = Tween.linear;
    events: Partial<Record<EventType, EventCallback>> = {};
    exportedValues: Record<string, any> = {};
    tweening: boolean = false;
    update: ((values: Record<string, any>) => void) | null = null;
    paused: boolean = false;
    lastTime: number = 0;
    elapsed: number = 0;
    oscillating: boolean = false;
}

/**
 * The logger for this module.
 */
const logger = new Logger();
logger.registerType('Tween-Module', '#ff6600');

export { Tween };
export default Tween;
