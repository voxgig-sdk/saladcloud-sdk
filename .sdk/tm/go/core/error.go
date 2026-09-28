package core

type SaladcloudError struct {
	IsSaladcloudError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSaladcloudError(code string, msg string, ctx *Context) *SaladcloudError {
	return &SaladcloudError{
		IsSaladcloudError: true,
		Sdk:              "Saladcloud",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SaladcloudError) Error() string {
	return e.Msg
}
