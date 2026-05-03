import { Redirect, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ScreenShell } from '@/components/screen-shell';
import { palette } from '@/constants/palette';
import { useAuth } from '@/contexts/auth-context';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const errors = useMemo(() => {
    return {
      email: !email.trim()
        ? 'O e-mail e obrigatorio'
        : !emailRegex.test(email.trim())
          ? 'Formato de e-mail invalido'
          : '',
      password: !password ? 'A senha e obrigatoria' : password.length < 6 ? 'Minimo de 6 caracteres' : '',
    };
  }, [email, password]);

  const hasErrors = !!errors.email || !!errors.password;

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    setSubmitted(true);
    setInvalidCredentials(false);

    if (hasErrors) return;

    const ok = await login(email, password);
    if (!ok) {
      setInvalidCredentials(true);
    }
  };

  return (
    <ScreenShell contentStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Entrar no app</Text>
        <Text style={styles.subtitle}>Use seu e-mail e senha cadastrados para acessar as salas.</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="usuario@dominio.com"
          placeholderTextColor={palette.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {submitted && !!errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="******"
          placeholderTextColor={palette.textMuted}
          secureTextEntry
        />
        {submitted && !!errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        {submitted && invalidCredentials ? <Text style={styles.error}>Credenciais invalidas</Text> : null}

        <ActionButton label="Entrar" onPress={handleLogin} style={styles.button} />
        <ActionButton
          label="Criar conta"
          onPress={() => router.push('/cadastro')}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  title: {
    color: palette.text,
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: palette.textMuted,
    fontSize: 14,
    marginBottom: 16,
    marginTop: 8,
  },
  label: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: palette.surfaceAlt,
    borderColor: palette.border,
    borderRadius: 12,
    borderWidth: 1,
    color: palette.text,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  error: {
    color: '#ff5c5c',
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    marginTop: 12,
  },
});
