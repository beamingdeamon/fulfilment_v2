<template>
    <div class="form">
            <v-container>
                <v-row class="d-flex justify-center align-center">
                    <v-col class="d-flex align-center" cols="2">
                        <div class="logo">
                            <img src="../../assets/logo/fullfilment-logo.svg" alt="logo">
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="form__card">
                            <h3>Вы успешно зарегистрировались! Можете <router-link to="/login">Войти</router-link></h3>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<style lang="scss" scoped>
.form {
    height: 100%;
		&__inner {
            height: 100%;
		}

        &__card{
            padding: 20px;
            
            border-radius: 3%;
        }

        &__row{
            display: flex;
            justify-content: center;
            margin: 100px 0 0 0;
        }

        &__text{
            text-align: center;
            margin: 10px 0 0 0;
        }

        &__button{
            margin: 10px 0 0 0;
            &:last-child{
                margin-bottom: 10px;
            }
        }

        &__link{
            text-align: center;
            width: 100%;
            margin: 20px 0 0 0;
        }

        
}
.form {
}
.input {
}
.invalid-feedback{
    color: rgb(252, 20, 20);
}

.logo{
    width: 150px;
    height: 150px;
    img{
        max-width: 100%;
        border-radius: 40%;
    }
}

.container{
    height: 100%;
}

.row{
    height: 100%;
}

</style>