import { Redirect } from 'expo-router';

export default function Index() {
  // Check if user is authenticated
  // For now, redirect to onboarding
  return <Redirect href="/onboarding" />;
}