export const getStudent = (idStudent) => {
    return () => { return fetch(`http://localhost:5000/personalOffStudent/?id=${idStudent}`).then((e) => e.json()
    );
  };
}

export const getPerson = (login) => {
  return () => {
    return fetch(`http://localhost:5000/getLogin?login=${login}`).then((e) => e.json());
  };
};