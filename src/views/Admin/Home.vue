<template>
	<section>
		<v-row class="ma-5">
			<v-col cols="12" md="3" v-for="(item, i) in info" :key="i">
				<v-card class="pa-5 d-flex justify-space-around">
					<v-icon size="50" :color="item.color">
						{{ item.icon }}
					</v-icon>
					<div>
						<h3>
							<center>
								{{ item.title }}
							</center>
						</h3>
						<center>
							{{ item.number }}
						</center>
					</div>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-container>
				<v-sparkline
					:value="[
						25,
						11,
						20,
						5,
						20,
						12,
						4,
						34,
						23,
						21,
						45,
						56,
						67,
						32,
						45,
						56,
						54,
						34,
						34,
						45,
						71,
					]"
					:smooth="10"
					:line-width="2"
					auto-draw
					stroke-linecap="round"
					:gradient="['green', 'yellow', 'red']"
					:auto-line-width="true"
					:labels="[
						25,
						11,
						20,
						5,
						20,
						12,
						4,
						34,
						23,
						21,
						45,
						56,
						67,
						32,
						45,
						56,
						54,
						34,
						34,
						45,
						71,
					]"
				></v-sparkline>
			</v-container>
		</v-row>
	</section>
</template>

<script>
export default {
	data() {
		return {
			info: [
				{
					icon: 'mdi-monitor-cellphone',
					title: 'New visits',
					color: 'cyan',
					number: 10231,
				},
				{
					icon: 'mdi-message-outline',
					title: 'Messages',
					color: 'blue darken-2',
					number: 2301,
				},
				{
					icon: 'mdi-account-outline',
					title: 'Users',
					color: 'red darken-1',
					number: 500,
				},
				{
					icon: 'mdi-cart-outline',
					title: 'Shoppings',
					color: 'cyan',
					number: 9991,
				},
			],
		};
	},
};
</script>
