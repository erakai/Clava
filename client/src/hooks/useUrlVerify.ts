const urlVerify = () => {
  const check = (url: string) => {
    const regex: RegExp = new RegExp("/^((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$/")

    const verify = regex.exec(url)
    return (verify != null)
  }

  return check
}

export default urlVerify