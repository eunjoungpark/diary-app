<template>
    <nav id="nav">
        <h2 class="skip">왼쪽 메뉴</h2>
        <ul>
            <router-link tag="li" class="nav-icon01" to="/login"><a><icon name="user-alt" scale="1.2" /> <span class="nav-label">Login</span></a></router-link> <!-- or user-check -->
            <router-link tag="li" class="nav-icon02" to="/write"><a><icon name="edit" scale="1.2" /> <span class="nav-label">Add Diary</span></a></router-link>
            <router-link tag="li" class="nav-icon03" to="/mypage"><a><icon name="address-book" scale="1.2" /> <span class="nav-label">MyPage</span></a></router-link>
        </ul>        
    </nav>
</template>

<script>

export default {
}
</script>

<style>

</style>
