export async function promiseAllSetteled(promises: Promise<any>[]) {
  try {
    const promiseResults = await Promise.allSettled(promises);
    const failedPromise = promiseResults.find(
      (promiseResult) => promiseResult.status === "rejected"
    );

    if (failedPromise) {
      console.log("promiseAllSetteled failed", failedPromise);
      throw new Error("Error During Promise All Setteled");
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllResolvedPromises<T>(promises: Promise<T>[]) {
  try {
    // Wait for all promises to settle
    const promiseResults = await Promise.allSettled(promises);

    // Separate fulfilled values and rejected reasons
    const fulfilled: T[] = [];
    const rejected: any[] = [];

    promiseResults.forEach((result) => {
      if (result.status === "fulfilled") {
        fulfilled.push(result.value);
      } else if (result.status === "rejected") {
        rejected.push(result.reason);
      }
    });

    if (fulfilled.length > 0) {
      return fulfilled;
    } else {
      throw new Error(rejected[0]);
    }
  } catch (error) {
    throw error;
  }
}
