// Bootstrap ships no types for its single plugin files (only used for their data API)
declare module 'bootstrap/js/dist/button'
declare module 'bootstrap/js/dist/carousel'
declare module 'bootstrap/js/dist/collapse'
declare module 'bootstrap/js/dist/dropdown'
declare module 'bootstrap/js/dist/modal'
declare module 'bootstrap/js/dist/tab' {
    export default class Tab {
        static getOrCreateInstance(element: Element): Tab
        show(): void
    }
}
