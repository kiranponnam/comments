const sessionKey = "userDetails";
export const getSession = () => {
  const session = sessionStorage.getItem(sessionKey);

  if (session) {
    try {
      const data = JSON.parse(atob(session));

      return data;
    } catch (e) {
      return;
    }
  }

  return;
};

export const saveSession = async (session: any) => {

  const sessionEncrypted = btoa(JSON.stringify(session));

 await sessionStorage.setItem(sessionKey, sessionEncrypted);
};
