import './styles/main.scss';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRef } from 'react';
import type { ObjectSchema } from 'yup';

interface IFormData {
	email: string;
	password: string;
	passwordRepeat: string;
}

const schema: ObjectSchema<IFormData> = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
		passwordRepeat: yup.string().required(),
	})
	.required();

export function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
		},
		resolver: yupResolver(schema),
	});

	// const emailValidationProps = {
	// 	minLength: { value: 8, message: 'Почта должна содержать от 6 символов.' },
	// 	maxLength: {
	// 		value: 30,
	// 		message: 'Имя пользователя должно содержать до 30 символов.',
	// 	},
	// 	pattern: {
	// 		value: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	// 		message:
	// 			'Извините, но допускаются только латинские буквы (a-z), цифры (0-9) и точки (.).',
	// 	},
	// };

	const emailError = errors.email?.message;

	const submitButton = useRef(null);

	// 	} else if (passwordValue && passwordValue !== passwordRepeatValue) {
	// 		setError('Пароли не совпадают.');

	const onSubmit: SubmitHandler<IFormData> = (formData) => console.log(formData);

	return (
		<main className="container layout">
			<form className="form" onSubmit={handleSubmit((formData) => onSubmit(formData))}>
				<div className="fields">
					<div className="labels">
						<label htmlFor="email">Ваш Email</label>
						<label htmlFor="password">Пароль</label>
						<label htmlFor="password-repeat">Повтор пароля</label>
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
							name="password-repeat"
							type="password"
						/>
					</div>
				</div>
				<button
					disabled={!!emailError}
					ref={submitButton}
					type="submit"
					className="button"
				>
					Зарегистрироваться
				</button>
				{emailError && <p>{emailError}</p>}
			</form>
		</main>
	);
}
