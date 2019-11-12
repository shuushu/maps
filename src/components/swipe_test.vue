<template>
    <div class="test-wrap">
        <div class="carousel-wrap">
            <carousel v-bind="options" @initialized="init" @changed="changed">
                <img src="https://placeimg.com/200/200/any?1">
                <img src="https://placeimg.com/200/200/any?2">
                <img src="https://placeimg.com/200/200/any?3">
                <img src="https://placeimg.com/200/200/any?4">
            </carousel>
        </div>
    </div>
</template>


<script>
    import carousel from 'vue-owl-carousel2'

    export default {
        name: 'swipeTest',
        components: {
            carousel,
        },
        data() {
            return {
                plugin: null,
                options: {
                    autoplay: false,
                    items: 1,
                    startPosition: 2,
                    autoplayTimeout: 1000,
                },
            };
        },
        methods: {
            handleScroll() {
                window.addEventListener('scroll', () => {
                    const scrollT = window.scrollY;

                    if (scrollT > 0 && this.options.autoplay === false) {
                        this.options.autoplay = true;
                        setTimeout(() => {
                            this.plugin.refresh()
                        }, 300)
                    } else if (scrollT === 0) {
                        this.options.autoplay = false;
                        setTimeout(() => {
                            this.plugin.refresh()
                        }, 300)
                    }
                });
            },
            init() {
                this.plugin = this.$children[0];
            },
            changed(e) {
                this.options.startPosition = e.item.index
            },

        },
        mounted() {
            this.handleScroll();
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>

<style lang="scss" scoped>
    .test-wrap{
        border: 1px solid #000;
        height: 3000px;
    }
    .carousel-wrap{
        width: 300px;
        margin: 0 auto;
    }

</style>