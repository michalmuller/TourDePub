<template>
  <div class="flex">
    <div
      @click="$emit('change', !value)"
      :class="{ 'bg-blue border-blue': value }"
      class="w-5 h-5 rounded border border-grey inline-flex justify-center items-center bg-white cursor-pointer"
    >
      <svg
        class="w-2/3 fill-current text-white"
        viewBox="0 0 417 417"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M159.677 364.278C155.696 368.282 150.266 370.516 144.624 370.516C138.983 370.516 133.552 368.282 129.571 364.278L9.35675 244.044C-3.11892 231.568 -3.11892 211.338 9.35675 198.886L24.4094 183.829C36.889 171.354 57.0957 171.354 69.5713 183.829L144.624 258.886L347.428 56.0786C359.907 43.6029 380.134 43.6029 392.59 56.0786L407.642 71.1351C420.118 83.6108 420.118 103.837 407.642 116.293L159.677 364.278Z"
          fill="white"
        />
      </svg>
    </div>
    <p class="text-sm ml-2 text-gray-800">
      I agree to
      <span @click="openTerms" class="text-blue font-semibold">terms and stuff</span>
    </p>
  </div>
</template>

<script>
export default {
  model: {
    event: "change"
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    openTerms() {
      this.$parent.openTerms = true;
      this.$parent.openedTerms = true;
    }
  }
};
</script>