<template>
    <div class="auth-layout">
        <div class="auth-layout__inner">
            <router-view/>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.auth-layout {
    height: 100%;
    background-color: #DCDCDC;
		&__inner {
            // position: absolute;
            // top: 20%;
            // left: 50%;
            height: 100%;
		}
}

</style>