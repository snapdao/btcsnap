export const copyToClipboard = async (text: string) => {
  try {
    let copyValue = '';

    if (!navigator.clipboard) {
      throw new Error('Browser don\'t have support for native clipboard.');
    }

    if (text) {
      copyValue = text;
    }

    await navigator.clipboard.writeText(copyValue);
    return true;
  } catch (error) {
    const msg = error ? (error as Error)?.message : error;
    console.error(msg);
    return false;
  }
};
