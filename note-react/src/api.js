import axios from "axios";

const apiURL = 'http://localhost:3020';

export default {
  user: {
    login: credentials =>
      axios.post(apiURL + "/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post(apiURL + "/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post(apiURL + "/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post(apiURL + "/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post(apiURL + "/api/auth/validate_token", { token }),
    resetPassword: data => axios.post(apiURL + "/api/auth/reset_password", { data })
  },
  notes: {
    fetchAll: () => axios.get("apiURL + /api/notes").then(res => res.data.notes),
    search: (limit, start, order) => 
      axios.get("apiURL + /api/notes/search?limit=" + limit + "&start=" + start + "&order=" + order)
            .then(res => res.data.notes),
    create: note => axios.post("apiURL + /api/notes", { note }).then(res => res.data.note),
    update: note => axios.put("apiURL + /api/notes/" + note.id, { note }).then(res => res.data.note),
    remove: id => axios.delete("apiURL + /api/notes/" + id, {}).then(res => res.data)
  }
};
