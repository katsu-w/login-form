import './styles/main.scss';
import { type ChangeEvent, type FormEvent, useRef, useState } from 'react';

export function App() {
	const [emailValue, setEmailValue] = useState<string>('');
	const [passwordValue, setPasswordValue] = useState<string>('');
	const [passwordRepeatValue, setPasswordRepeatValue] = useState<string>('');
	const [error, setError] = useState<null | string>(null);

	const submitButton = useRef(null);

	const onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void = ({ target }) => {
		setEmailValue(target.value);
	};

	const validate: () => void = () => {
		if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
			setError(
				'Извините, но допускаются только латинские буквы (a-z), цифры (0-9) и точки (.).',
			);
		} else if (emailValue.length > 30) {
			setError('Имя пользователя должно содержать до 30 символов.');
		} else if (passwordValue && passwordValue !== passwordRepeatValue) {
			setError('Пароли не совпадают.');
		} else {
			setError(null);
		}
	};

	const onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void = ({
		target,
	}) => {
		setPasswordValue(target.value);
	};

	const onPasswordRepeatChange: (event: ChangeEvent<HTMLInputElement>) => void = ({
		target,
	}) => {
		setPasswordRepeatValue(target.value);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (emailValue && passwordValue && passwordRepeatValue) {
			console.log({
				email: emailValue,
				password: passwordValue,
			});
		}
	};

	return (
		<main className="container layout">
			<form className="form" onSubmit={onSubmit}>
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
							onBlur={validate}
							placeholder="example@gmail.com"
							name="email"
							type="email"
						/>
						<input
							className="input"
							value={passwordValue}
							onChange={onPasswordChange}
							onBlur={validate}
							placeholder="y0uR!pAsS"
							name="password"
							type="password"
						/>
						<input
							className="input"
							value={passwordRepeatValue}
							onChange={onPasswordRepeatChange}
							onBlur={validate}
							placeholder="y0uR!pAsS"
							name="password-repeat"
							type="password"
						/>
					</div>
				</div>
				<button
					disabled={error !== null}
					ref={submitButton}
					type="submit"
					className="button"
				>
					Зарегистрироваться
				</button>
				{error && <p>{error}</p>}
			</form>
		</main>
	);
}
