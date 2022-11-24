interface ICopyToClipboard {
  text: string;
  message?: string;
}

export const copyToClipboard = async ({ text }: ICopyToClipboard) => {
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
  } catch (error: any) {
    console.error(error.message || error);
    return false;
  }
};
