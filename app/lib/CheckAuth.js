import AuthStore from '../stores/AuthStore';

export default function(nextState, transition) {
  if (!AuthStore.isAuthenticated()) {
    AuthStore.setLoginReferrer(nextState.location.pathname);
    transition(null, '/login');
  }
}
