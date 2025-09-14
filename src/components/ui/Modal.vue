<template>
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <header v-if="$slots.title" class="modal-header">
          <h3 class="modal-title">
            <slot name="title" />
          </h3>
        </header>
  
        <div class="modal-body">
          <slot />
        </div>
  
        <footer class="modal-footer">
          <Button class="close-btn" @click="$emit('close')">OK</Button>
        </footer>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Button from './Button.vue'
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    color: #000;
    padding: 20px 28px;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    animation: fadeIn 0.25s ease;
  }
  
  .modal-header {
    margin-bottom: 12px;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: 600;
  }
  
  .modal-body {
    margin: 12px 0;
  }
  
  .modal-footer {
    margin-top: 16px;
  }
  
  .close-btn {
    margin-top: 8px;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  </style>
  