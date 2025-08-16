declare module "mixitup" {
  export interface Mixer {
    filter: (selector: string) => void;
    sort?: (command: string) => void;
    destroy?: () => void;
  }

  const mixitup: (
    container: Element | string,
    config?: Record<string, unknown>
  ) => Mixer;
  export default mixitup;
}
