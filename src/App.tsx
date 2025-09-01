import './styles/main.scss';
import { type ChangeEvent, useState } from 'react';

export function App() {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [passwordRepeatValue, setPasswordRepeatValue] = useState<string>('');

	const onEmailChange: (event: ChangeEvent) => void = ({ target }) => {
		setEmailValue(target?.value);
	};

	const onPasswordChange: (event: ChangeEvent) => void = ({ target }) => {
		setPasswordValue(target?.value);
	};

	const onPasswordRepeatChange: (event: ChangeEvent) => void = ({ target }) => {
		setPasswordRepeatValue(target?.value);
	};

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
							onChange={onEmailChange}
							name="email"
							type="email"
						/>
						<input
							className="input"
							value={passwordValue}
							onChange={onPasswordChange}
							name="password"
							type="password"
						/>
						<input
							className="input"
							value={passwordRepeatValue}
							onChange={onPasswordRepeatChange}
							name="password-repeat"
							type="password"
						/>
					</div>
				</div>
				<button type="submit" className="button">
					Зарегистрироваться
				</button>
			</form>
		</main>
	);
}
