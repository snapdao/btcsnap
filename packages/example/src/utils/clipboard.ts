interface ICopyToClipboard {
  text: string;
  message?: string;
}

export const copyToClipboard = async ({ text, message }: ICopyToClipboard) => {
  try {
    let copyValue = '';

    if (!navigator.clipboard) {
      throw new Error("Browser don't have support for native clipboard.");
    }

    if (text) {
      copyValue = text;
    }

    await navigator.clipboard.writeText(copyValue);
    console.log(message ?? 'Copied!!!');
    return true;
  } catch (error: any) {
    console.log(error.message || error);
    return false;
  }
};
