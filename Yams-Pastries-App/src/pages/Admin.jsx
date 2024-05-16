import { useState } from 'react';
import { useLoginMutation } from '../features/authFeature/authReducer';


function Admin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword]= useState('');

  const [login, { isLoading }] = useLoginMutation();
  


  const validateEmail = (email) => {
      const emailRegex = /^[^@]+@[^@]+$/;
      return emailRegex.test(email);
  };
/*
  const validatePassword = (password) => {
      const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,20}$/;
      return passwordRegex.test(password);
  };*/

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (!validateEmail(email)) {
          setError('Email invalide.');
          return;
      }

     /* if (!validatePassword(password)) {
          setError('Le mot de passe doit contenir entre 8 et 20 caractères, avec au moins un chiffre.');
          return;
      }*/
      try {
        const result = await login({ email, password });
        if (result.data) {
          console.log('Connexion réussie', result.data);
          setError('');
        } else {
          setError('Erreur d\'authentification.');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Erreur d\'authentification.');
      }
    };

  return (
      <div>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Email:</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                  <label>Mot de passe:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
          </form>
      </div>
  );
}

export default Admin;