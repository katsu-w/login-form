import './styles/main.scss';
import { useRef, useState } from 'react';

export function App() {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [passwordRepeatValue, setPasswordRepeatValue] = useState<string>('');

	const submitButton = useRef(null);

	return (
		<main className="container layout">
			<form className="form">
				<div className="fields">
					<div className="labels">
						<label htmlFor="email">Ваш Email</label>
						<label htmlFor="password">Пароль</label>
						<label htmlFor="password-repeat">Повтор пароля</label>
					</div>
					<div className="inputs">
						<input
							className="input"
							value={emailValue}
							onChange={(e) => setEmailValue(e.target.value)}
							name="email"
							type="email"
						/>
						<input
							className="input"
							value={passwordValue}
							onChange={(e) => setPasswordValue(e.target.value)}
							name="password"
							type="password"
						/>
						<input
							className="input"
							value={passwordRepeatValue}
							onChange={(e) => setPasswordRepeatValue(e.target.value)}
							name="password-repeat"
							type="password"
						/>
					</div>
				</div>
				<button ref={submitButton} type="submit" className="button">
					Зарегистрироваться
				</button>
			</form>
		</main>
	);
}
