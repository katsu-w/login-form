import './styles/main.scss';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef /*useState*/ } from 'react';

interface IFormData {
	email: string;
	password: string;
	passwordRepeat: string;
}

const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.required('Введите почту')
			.matches(
				/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/,
				'Введите почту. Допускаются только латинские буквы (a-z), цифры (0-9) и точки (.).',
			)
			.trim()
			.min(6, 'Почта должна содержать от 6 символов.')
			.max(30, 'Почта должна содержать до 30 символов.'),
		password: yup
			.string()
			.required('Введите пароль')
			.trim()
			.min(6, 'Пароль должен содержать от 6 символов.'),
		passwordRepeat: yup
			.string()
			.required('Required')
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
	})
	.required();

export function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(schema),
	});

	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [passwordRepeat, setPasswordRepeat] = useState('');

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passwordRepeatError = errors.passwordRepeat?.message;

	const submitButton = useRef(null);

	const onSubmit: SubmitHandler<IFormData> = (formData) => {
		console.log(formData);
	};

	return (
		<main className="container layout">
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<div className="fields">
					<div className="labels">
						<label htmlFor="email">Ваш Email</label>
						<label htmlFor="password">Пароль</label>
						<label htmlFor="passwordRepeat">Повтор пароля</label>
					</div>
					<div className="inputs">
						<input
							className="input"
							{...register('email')}
							// value={email}
							// onChange={(e) => {
							// 	setEmail(e.target.value);
							// }}
							placeholder="example@gmail.com"
							name="email"
							type="email"
						/>
						<input
							className="input"
							{...register('password')}
							// value={password}
							// onChange={(e) => {
							// 	setPassword(e.target.value);
							// }}
							placeholder="y0uR!pAsS"
							name="password"
							type="password"
						/>
						<input
							className="input"
							{...register('passwordRepeat')}
							// value={passwordRepeat}
							// onChange={(e) => {
							// 	setPasswordRepeat(e.target.value);
							// }}
							placeholder="y0uR!pAsS"
							name="passwordRepeat"
							type="password"
						/>
					</div>
				</div>
				<button
					disabled={!!emailError || !!passwordError || !!passwordRepeatError}
					ref={submitButton}
					type="submit"
					className="button"
				>
					Зарегистрироваться
				</button>
				{emailError && <p>{emailError}</p>}
				{passwordError && <p>{passwordError}</p>}
				{passwordRepeatError && <p>{passwordRepeatError}</p>}
			</form>
		</main>
	);
}
