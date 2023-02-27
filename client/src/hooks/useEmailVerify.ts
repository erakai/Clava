const emailVerify = () => {
  const check = (email: string) => {
    const regex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const verify = regex.exec(email)
    return (verify != null)
  }

  return check
}

export default emailVerify