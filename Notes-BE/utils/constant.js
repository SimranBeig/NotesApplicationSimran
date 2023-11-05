module.exports.errorMessage = {
	registrationFailed: "User registration failed",
	authorizationFailed: "Unauthorized",
	invalidToken: "Invalid token",
	usernameExists: "Username Already exists",
	userNotFound: "User not found",
	invalidPassword: "Invalid password",
	loginFailed: "User login failed",
	addNoteFailed: "Note Cannot Be Added",
	fetchNoteserror: "Error fetching notes",
	noteNotFound: "Note not found",
	updateNoteError: "Error Updating Note",
	deleteNodeError: "Error deleting note",
};

module.exports.successMessage = {
	registrationSuccessful: "User Successfully Registered",
	loginSuccessful: "User Login Successful",
	noteAdded: "Note Added Successfully",
	noteUpdated: "Note Updated Successfully",
	noteDeleted: "Note deleted successfully",
};

module.exports.sqlErrors = {
	duplicateUsername:
		'duplicate key value violates unique constraint "username"',
};
