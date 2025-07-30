
<template>
  <div class="login">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Nom d'utilisateur" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, password: password.value })
  })
  if (response.ok) {
    sessionStorage.setItem('user', username.value)
    router.push('/dashboard')
  } else {
    error.value = 'Identifiants invalides'
  }
}
</script>
