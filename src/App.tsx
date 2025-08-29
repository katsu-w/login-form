import './styles/main.scss';

export function App() {
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
						<input className="input" name="email" type="email" />
						<input className="input" name="password" type="password" />
						<input className="input" name="password-repeat" type="password" />
					</div>
				</div>
				<button type="submit" className="button">
					Зарегистрироваться
				</button>
			</form>
		</main>
	);
}
