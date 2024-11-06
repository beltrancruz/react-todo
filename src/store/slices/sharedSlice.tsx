import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ThemeEnum } from '../../enums/shared.enum'

interface SharedState {
	theme: ThemeEnum,
	// [key: string]: any,
}

const initialState: SharedState  = {
	theme: ThemeEnum.LIGHT
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState: initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<ThemeEnum>) => {
			state.theme = action.payload
		},
		changeThemeToLight: (state) => {
			state.theme = ThemeEnum.LIGHT
		},
		changeThemeToDark: (state) => {
			state.theme = ThemeEnum.DARK
		}
	},
	/*
	
	extraReducers(builder) {
		builder
		.addCase(asyncReducerExample.pending, (state, payload) => {
			console.log({ msg: 'loading...' });
		})
		.addCase(asyncReducerExample.fulfilled, (state, payload) => {
			// code...
		})
	}
	
	*/
})


/*

export const asyncReducerExample = createAsyncThunk(
	'shared/doAnAsyncFunction', 
	async (numberValue: number) => {
		await new Promise(resolve => setTimeout(() => resolve, 1_000))
		return numberValue
	},
)

*/

export const { changeTheme, changeThemeToDark, changeThemeToLight } = sharedSlice.actions
export default sharedSlice.reducer;