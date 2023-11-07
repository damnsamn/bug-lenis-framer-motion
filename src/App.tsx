import {LenisInstance, ReactLenis} from "@studio-freight/react-lenis";
import {motion, useScroll} from "framer-motion";
import {useRef} from "react";
import "./App.css";

/**
 * Here I have a few examples of react framer behaviour. Just change the default export to compare each demonstration.
 *
 * Consider Framer Motion to be working correctly when the number in the center of the screen updates while scrolling.
 */

/**
 * This is the expected Framer Motion behaviour, which we would expect to maintain while using Lenis
 */
function ExampleReactFramerVanilla() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const {scrollYProgress} = useScroll({container: scrollRef});

	return (
		<>
			<div ref={scrollRef} className="wrapper">
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>

			<motion.span className="progress">{scrollYProgress}</motion.span>
		</>
	);
}

/**
 * This is an example of the suggestion solution - providing ReactLenis a ref callback
 * to manually populate a separate `wrapperRef` with the correct element reference.
 *
 * Here we will encounter a hydration issue, presumably caused by some race condition.
 * This will automatically resolve itself when Vite HMR re-serves this component on save - ignore that.
 */
function ExampleReactFramerLenis() {
	const lenisRef = useRef<LenisInstance>();
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const {scrollYProgress} = useScroll({container: wrapperRef});

	return (
		<>
			<ReactLenis
				ref={(lenis: LenisInstance | undefined) => {
					if (lenis) {
						lenisRef.current = lenis;
						wrapperRef.current = lenis.options.wrapper as HTMLDivElement;
					}
				}}
				className="wrapper">
				<div />
				<div />
				<div />
				<div />
				<div />
			</ReactLenis>

			<motion.span className="progress">{scrollYProgress}</motion.span>
		</>
	);
}

export default ExampleReactFramerVanilla;
