export const getStudents = () => {
    return fetch("http://localhost:5000/students").then((e) => e.json())
}