import './styles/main.scss';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';

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
			.required('Введите повтор пароля')
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

	let errorArr: string[] = [];

	errors.email?.message ? errorArr.push(errors.email.message) : null;
	errors.password?.message ? errorArr.push(errors.password.message) : null;
	errors.passwordRepeat?.message ? errorArr.push(errors.passwordRepeat.message) : null;

	const submitButtonRef = useRef(null);

	useEffect(() => {
		if (errorArr.length === 0) {
			submitButtonRef.current?.focus();
		}
	}, [errorArr]);

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
							placeholder="example@gmail.com"
							name="email"
							type="email"
						/>
						<input
							className="input"
							{...register('password')}
							placeholder="y0uR!pAsS"
							name="password"
							type="password"
						/>
						<input
							className="input"
							{...register('passwordRepeat')}
							placeholder="y0uR!pAsS"
							name="passwordRepeat"
							type="password"
						/>
					</div>
				</div>
				<button
					disabled={errorArr.length > 0}
					ref={submitButtonRef}
					type="submit"
					className="button"
				>
					Зарегистрироваться
				</button>
				{errorArr.length > 0 &&
					errorArr.map((msg) => {
						return msg ? <p key={msg}>{msg}</p> : null;
					})}
			</form>
		</main>
	);
}
