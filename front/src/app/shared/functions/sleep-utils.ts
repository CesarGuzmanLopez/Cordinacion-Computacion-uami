export class SleepUtils {
  static async timeout(ms: number): Promise<boolean> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(true); // Cambiar a true cuando se cumple el tiempo
      }, ms),
    );
  }
}
