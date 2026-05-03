import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Redirect, router } from 'expo-router';

import { ActionButton } from '@/components/action-button';
import { ScreenShell } from '@/components/screen-shell';
import { palette } from '@/constants/palette';
import { useAuth } from '@/contexts/auth-context';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
  const { isAuthenticated, register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    return {
      fullName: !fullName.trim() ? 'O nome completo e obrigatorio' : '',
      email: !email.trim()
        ? 'O e-mail e obrigatorio'
        : !emailRegex.test(email.trim())
          ? 'Formato de e-mail invalido'
          : '',
      password: !password ? 'A senha e obrigatoria' : password.length < 6 ? 'Minimo de 6 caracteres' : '',
      confirmPassword: !confirmPassword
        ? 'Confirme sua senha'
        : confirmPassword !== password
          ? 'As senhas nao conferem'
          : '',
    };
  }, [confirmPassword, email, fullName, password]);

  const hasErrors = Object.values(errors).some(Boolean);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  const handleRegister = async () => {
    setSubmitted(true);
    if (hasErrors) return;

    await register({ fullName, email, password });
  };

  return (
    <ScreenShell contentStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Criar cadastro</Text>
        <Text style={styles.subtitle}>Cadastre seu usuario para acessar o app.</Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor={palette.textMuted}
        />
        {submitted && !!errors.fullName ? <Text style={styles.error}>{errors.fullName}</Text> : null}

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

        <Text style={styles.label}>Confirmacao de senha</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholder="******"
          placeholderTextColor={palette.textMuted}
          secureTextEntry
        />
        {submitted && !!errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}

        <ActionButton label="Cadastrar" onPress={handleRegister} style={styles.button} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: '700',
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
    marginTop: 14,
  },
});
