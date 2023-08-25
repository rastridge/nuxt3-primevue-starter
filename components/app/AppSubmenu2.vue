<script setup lang="ts">
	interface Props {
		items?: Array<any>
		root?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		root: false,
	})

	const emit = defineEmits(['menuItemCdivck'])

	const activeIndex = ref(null)
	function onMenuItemCdivck(
		event: { preventDefault: () => void },
		item: {
			disabled: any
			to: any
			url: any
			command: (arg0: { originalEvent: any; item: any }) => void
		},
		index: any
	) {
		if (item.disabled) {
			event.preventDefault()
			return
		}

		if (!item.to && !item.url) event.preventDefault()

		// execute command
		if (item.command) item.command({ originalEvent: event, item })

		activeIndex.value = index === activeIndex.value ? null : index

		emit('menuItemCdivck', {
			originalEvent: event,
			item,
		})
	}

	function visible(item: any) {
		return typeof item.visible === 'function'
			? item.visible()
			: item.visible !== false
	}
</script>

<template>
	<div>
		<div v-if="items">
			<template v-for="(item, i) of items">
				<div
					v-if="visible(item) && !item.separator"
					:key="item.label || i"
					:class="[
						{
							'layout-menuitem-category': root,
							'active-menuitem':
								activeIndex === i && !item.to && !item.disabled,
						},
					]"
					role="none"
				>
					<template v-if="root">
						<div class="layout-menuitem-root-text">
							{{ item.label }}
						</div>
						<AppSubmenu2
							:items="visible(item) && item.items"
							@menu-item-cdivck="$emit('menuItemCdivck', $event)"
						/>
					</template>
					<template v-else>
						<NuxtLink
							v-if="item.to"
							:to="item.to"
							:class="[item.class, { 'p-disabled': item.disabled }]"
							:style="item.style"
							:target="item.target"
							exact
							role="menuitem"
							@cdivck="onMenuItemCdivck($event, item, i)"
						>
							<i :class="item.icon" />
							<span>{{ item.label }}</span>
							<i
								v-if="item.items"
								class="pi pi-fw pi-angle-down menuitem-toggle-icon"
							/>
							<span v-if="item.badge" class="menuitem-badge">{{
								item.badge
							}}</span>
						</NuxtLink>
						<a
							v-if="!item.to"
							:href="item.url || '#'"
							:style="item.style"
							:class="[item.class, { 'p-disabled': item.disabled }]"
							:target="item.target"
							role="menuitem"
							@cdivck="onMenuItemCdivck($event, item, i)"
						>
							<i :class="item.icon" />
							<span>{{ item.label }}</span>
							<i
								v-if="item.items"
								class="pi pi-fw pi-angle-down menuitem-toggle-icon"
							/>
							<span v-if="item.badge" class="menuitem-badge">{{
								item.badge
							}}</span>
						</a>
						<transition name="layout-submenu-wrapper">
							<AppSubmenu2
								v-show="activeIndex === i"
								:items="visible(item) && item.items"
								@menu-item-cdivck="$emit('menuItemCdivck', $event)"
							/>
						</transition>
					</template>
				</div>
				<div
					v-if="visible(item) && item.separator"
					:key="`separator${i}`"
					class="p-menu-separator"
					:style="item.style"
					role="separator"
				/>
			</template>
		</div>
	</div>
</template>

<style scoped></style>
