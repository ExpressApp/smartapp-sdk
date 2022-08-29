"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
const useQuery = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
};
exports.useQuery = useQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvaGVscGVycy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUNwQixNQUFNLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25FLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUN0RCxDQUFDLENBQUE7QUFHQyw0QkFBUSJ9